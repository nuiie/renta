import Airtable from "airtable"

console.log("run airtable")

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export const getProperties = async (): Promise<Property[]> => {
  console.log("run get property")
  try {
    const records = await base("property")
      .select({
        filterByFormula: `"{off_track}=FALSE()"`,
      })
      .firstPage()

    const res = records?.map(
      (r): Property => ({
        airtableId: r.getId() as string,
        id: r.fields.id as number,
        nickname: r.fields.nickname as string,
        address: r.fields.address as string,
        description: r.fields.description as string,
        gMap: r.fields.g_map as string,
        contract: r.fields.Contract as string[],
        offTrack: r.fields.off_track as boolean,
        maxRent: r.fields.max_rent as number,
        daysLeft:
          typeof r.fields.days_left == "number"
            ? (r.fields.days_left as number)
            : 0,
        launchDate: new Date(r.fields.launch_date as string),
      })
    )
    res.sort((a, b) => a.id - b.id)
    return res
  } catch (error) {
    console.error("Error fetching properties:", error)
    throw error // Re-throw the error after logging it
  }
}

export const getPayments = async (
  args: {
    overdue?: boolean
    contractId?: string
  } = {}
): Promise<Payment[]> => {
  let filter = {}
  if (args.overdue) {
    filter = { filterByFormula: `"{payment_status}='Overdue'"` }
  }
  if (args.contractId) {
    filter = { filterByFormula: `"{contract_id}='${args.contractId}'"` }
  }

  try {
    const records = await base("payment").select(filter).firstPage()
    return records
      .map(
        (r): Payment => ({
          airtableId: r.getId(),
          id: r.fields.id as number,
          contractAId: (<string[]>r.fields.contract_id)?.[0],
          paymentType: r.fields.payment_type as PaymentType,
          amountToBePaid: r.fields.amount_to_be_paid as number,
          due: new Date(r.fields.due as string),
          paymentNumber: r.fields.payment_number as number,
          paymentStatus: r.fields.payment_status as PaymentStatus,
          paidDate: new Date(r.fields.paid_date as string),
          paidAmount: r.fields.paid_amount as number,
          bank: r.fields.bank as BankAccount,
          desc: r.fields.desc as string,
        })
      )
      .sort((a, b) => a.paymentNumber - b.paymentNumber)
  } catch (error) {
    console.error("Error fetching payments:", error)
    throw error // Re-throw the error after logging it
  }
}

export const getContracts = async (): Promise<Contract[]> => {
  try {
    const records = await base("contract").select().firstPage()
    const res = records?.map(
      (r): Contract => ({
        airtableId: r.getId(),
        id: r.fields.id as number,
        propertyAId: (<string[]>r.fields.property)?.[0],
        nickname: r.fields.nickname as string,
        tenant: r.fields.tenant as string,
        contractStatus: r.fields.contract_status as ContractStatus,
        startDate: new Date(r.fields.start_date as string),
        duration: r.fields.duration as number,
        endDate: new Date(r.fields.end_date as string),
        rent: r.fields.rent as number,
        commonFee: r.fields.common_fee as number,
        tax: (r.fields["5%"] as boolean) ?? false,
        paymentAId: (r.fields.payment as string[]) ?? [],
      })
    )
    res.sort((a, b) => a.id - b.id)
    return res
  } catch (error) {
    console.error("Error fetching contracts:", error)
    throw error // Re-throw the error after logging it
  }
}

export default base
