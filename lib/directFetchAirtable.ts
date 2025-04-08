// lib/airtable.ts
import { getFirstAndLastDay } from "@/lib/utils"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

type AirtableRecord<T> = {
    id: string
    fields: T
    createdTime: string
}

type AirtableResponse<T> = {
    records: AirtableRecord<T>[]
    offset?: string
}

interface Payment {
    airtableId: string
    id: number
    contractAId: string
    paymentType: PaymentType
    amountToBePaid: number
    due: Date
    paymentNumber: number
    paymentStatus: PaymentStatus
    paidDate: Date | null
    paidAmount: number
    bank: BankAccount | null
    desc: string
    nickname: string
    tenant: string
}

/**
 * Fetches data from an Airtable table with support for filtering and pagination
 */
async function fetchAirtableTable<T>(
    table: string,
    options: {
        revalidate?: number,
        filterByFormula?: string,
        pageSize?: number,
        offset?: string
    } = { revalidate: 7200, pageSize: 100 } // 2 hours default, 100 records per page
): Promise<AirtableRecord<T>[]> {
    try {
        const url = new URL(`${AIRTABLE_API_URL}/${encodeURIComponent(table)}`)

        // Add filter if provided
        if (options.filterByFormula) {
            url.searchParams.append('filterByFormula', options.filterByFormula)
        }

        // Add pagination parameters
        if (options.pageSize) {
            url.searchParams.append('pageSize', options.pageSize.toString())
        }
        if (options.offset) {
            url.searchParams.append('offset', options.offset)
        }

        console.log(`Fetching ${table} with URL: ${url.toString()}`)

        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
            next: {
                revalidate: options.revalidate,
            },
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Failed to fetch ${table}: ${res.status} ${res.statusText} - ${errorText}`)
        }

        const data: AirtableResponse<T> = await res.json()

        // If there's an offset, fetch the next page recursively
        if (data.offset) {
            const nextPage = await fetchAirtableTable<T>(table, {
                ...options,
                offset: data.offset
            })
            return [...data.records, ...nextPage]
        }

        return data.records
    } catch (error) {
        console.error(`Error fetching ${table}:`, error)
        throw error // Re-throw the error after logging it
    }
}

// Mapping functions to transform Airtable data to internal interfaces
function mapProperty(record: AirtableRecord<PropertyFields>): Property {
    return {
        airtableId: record.id,
        id: record.fields.id,
        nickname: record.fields.nickname || '',
        address: record.fields.address || '',
        description: record.fields.description || '',
        gMap: record.fields.g_maps || '',
        contract: record.fields.contract || [],
        offTrack: record.fields.off_track || false,
        maxRent: record.fields.max_rent || 0,
        daysLeft: record.fields.days_left || 0,
        launchDate: record.fields.launch_date ? new Date(record.fields.launch_date) : new Date(),
        images: (record.fields.images || []).map((img: any) => {
            // Use a placeholder image URL if the Airtable URL is likely to be expired
            // This is a temporary solution until we implement a proper URL refresh mechanism
            const usePlaceholder = false // Set to true to use placeholders instead of potentially expired URLs

            return {
                id: img.id,
                url: usePlaceholder ? '/images/placeholder.jpg' : img.url,
                filename: img.filename,
                size: img.size,
                type: img.type,
                width: img.width || 0,
                height: img.height || 0
            }
        }),
        currentContractId: record.fields.current_contract?.[0] || undefined
    }
}

function mapContract(record: AirtableRecord<ContractFields>): Contract {
    return {
        airtableId: record.id,
        id: record.fields.id,
        propertyAId: record.fields.property?.[0] || '',
        nickname: record.fields.nickname?.[0] || '',
        tenant: record.fields.tenant || '',
        contractStatus: record.fields.contract_status || 'Expired',
        startDate: new Date(record.fields.start_date),
        duration: record.fields.duration || 0,
        endDate: new Date(record.fields.end_date),
        rent: record.fields.rent || 0,
        commonFee: record.fields.common_fee || 0,
        tax: record.fields["5%"] || false,
        paymentAId: record.fields.payment || []
    }
}

function mapPayment(record: AirtableRecord<PaymentFields>): Payment {
    return {
        airtableId: record.id,
        id: record.fields.id,
        contractAId: record.fields.contract_id?.[0] || '',
        paymentType: record.fields.payment_type || 'Rent',
        amountToBePaid: record.fields.amount_to_be_paid || 0,
        due: new Date(record.fields.due),
        paymentNumber: record.fields.payment_number || 0,
        paymentStatus: record.fields.payment_status || 'Not Due',
        paidDate: record.fields.paid_date ? new Date(record.fields.paid_date) : null,
        paidAmount: record.fields.paid_amount || 0,
        bank: record.fields.bank || null,
        desc: record.fields.desc || '',
        nickname: record.fields.nickname?.[0] || '',
        tenant: record.fields.tenant?.[0] || ''
    }
}

function mapMaintenance(record: AirtableRecord<MaintenanceFields>): Maintenance {
    return {
        airtableId: record.id,
        id: record.fields.id,
        date: new Date(record.fields.date),
        propertyId: record.fields.property_id?.[0] ? parseInt(record.fields.property_id[0]) : 0,
        nickname: record.fields.nickname?.[0] || '',
        details: record.fields.details || '',
        cost: record.fields.cost || 0,
        repairOrAsset: record.fields.repair_or_asset || 'repair'
    }
}

// Now expose table-specific helpers with mapped data
export async function getProperty(options: { offTrack?: boolean } = {}) {
    try {
        const filterByFormula = options.offTrack === false ? '{off_track}=FALSE()' : undefined
        const records = await fetchAirtableTable<PropertyFields>('property', { filterByFormula })
        return records.map(mapProperty)
    } catch (error) {
        console.error("Error in getProperty:", error)
        throw error
    }
}

export async function getContract(options: { current?: boolean } = {}) {
    try {
        const filterByFormula = options.current ? '{contract_status}="Ongoing"' : undefined
        const records = await fetchAirtableTable<ContractFields>('contract', { filterByFormula })
        return records.map(mapContract)
    } catch (error) {
        console.error("Error in getContract:", error)
        throw error
    }
}

export async function getPayment(options: {
    overdue?: boolean,
    contractId?: number,
    dayRange?: { firstDay: string; lastDay: string }
} = {}) {
    try {
        let filterByFormula: string | undefined

        if (options.overdue) {
            filterByFormula = '{payment_status}="Overdue"'
        } else if (options.contractId) {
            filterByFormula = `contract_id=${options.contractId}`
        } else if (options.dayRange) {
            const { firstDay, lastDay } = options.dayRange
            filterByFormula = `AND(IS_AFTER({due}, DATETIME_PARSE('${firstDay}')), IS_BEFORE({due}, DATETIME_PARSE('${lastDay}')))`
        }
        console.log('filterByFormula', filterByFormula)
        const records = await fetchAirtableTable<PaymentFields>('payment', { filterByFormula })
        return records.map(mapPayment)
    } catch (error) {
        console.error("Error in getPayment:", error)
        throw error
    }
}

export async function getMaintenance() {
    try {
        const records = await fetchAirtableTable<MaintenanceFields>('maintenance')
        return records.map(mapMaintenance)
    } catch (error) {
        console.error("Error in getMaintenance:", error)
        throw error
    }
}

export async function getNote() {
    try {
        const records = await fetchAirtableTable<PaymentFields>('note')
        return records.map(mapPayment)
    } catch (error) {
        console.error("Error in getNote:", error)
        throw error
    }
}

// Helper function to get revenue chart data
export async function getRevenueChartData(month = 6): Promise<{ month: string; revenue: number; missing: number }[]> {
    try {
        const dayRange = getFirstAndLastDay(new Date(), month)

        // Fetch payments and properties in parallel
        const [payments, properties] = await Promise.all([
            getPayment({ dayRange }),
            getProperty({ offTrack: false })
        ])

        // Function to format month as "MMM-YY"
        const formatMonth = (date: Date): string =>
            date.toLocaleString("en-US", { month: "short", year: "2-digit" })

        // 1. Calculate revenue by month
        const revenueByMonth: Record<string, number> = {}
        payments.forEach((payment) => {
            if (payment.paymentStatus === "Paid" && payment.paidAmount) {
                const month = formatMonth(new Date(payment.due))
                revenueByMonth[month] = (revenueByMonth[month] || 0) + payment.paidAmount
            }
        })

        // 2. Calculate expected max rent by month
        const maxRentByMonth: Record<string, number> = {}
        properties.forEach((property) => {
            if (property.launchDate) {
                const launchDate = new Date(property.launchDate)
                const today = new Date()

                while (launchDate <= today) {
                    const month = formatMonth(launchDate)
                    maxRentByMonth[month] = (maxRentByMonth[month] || 0) + property.maxRent
                    launchDate.setMonth(launchDate.getMonth() + 1)
                }
            }
        })

        // Ensure the current month is included with an amount of 0 if not already present
        const currentMonth = formatMonth(new Date())
        if (!revenueByMonth[currentMonth]) {
            revenueByMonth[currentMonth] = 0
        }
        if (!maxRentByMonth[currentMonth]) {
            maxRentByMonth[currentMonth] = 0
        }

        // 3. Combine data into the output array
        const allMonths = new Set([...Object.keys(revenueByMonth), ...Object.keys(maxRentByMonth)])
        const output = Array.from(allMonths)
            .map(month => ({
                month,
                revenue: parseFloat((revenueByMonth[month] || 0).toFixed(2)),
                missing: parseFloat(((maxRentByMonth[month] || 0) - (revenueByMonth[month] || 0)).toFixed(2))
            }))
            .sort((a, b) => new Date(`01-${b.month}`).getTime() - new Date(`01-${a.month}`).getTime())

        return output.slice(0, month)
    } catch (error) {
        console.error("Error in getRevenueChartData:", error)
        throw error
    }
}