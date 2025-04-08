declare global {
  // interface for raw airtable data
  interface PropertyFields {
    id: number // autoNumber
    nickname: string
    address: string
    description: string
    g_maps: string
    images: Array<ImageObject>
    contract: string[] // linked record IDs
    rent: number[] // multipleLookupValues (currency)
    maintenance: string[] // linked record IDs
    off_track: boolean
    max_rent: number // formula
    latest_contract_end: string // date (ISO string)
    days_left: number // formula
    launch_date: string // date (ISO string)
    current_contract: number[] // multipleLookupValues (number)
  }

  interface ContractFields {
    id: number // autoNumber
    property: string[] // linked record ID(s) to Property table
    nickname: string[] // lookup from property.nickname
    tenant: string
    contract_status: string // formula string: "Pending", "Ongoing", etc.
    terminated: boolean
    start_date: string // ISO date string
    duration: number // in months
    end_date: string // ISO date string, from formula
    rent: number
    common_fee: number
    ["5%"]: boolean
    soft_file: Array<ImageObject>
    payment: string[] // linked record IDs to Payment table
  }

  interface PaymentFields {
    id: number // autonumber
    contract_id: string // linked record ID (single)
    payment_type: PaymentType // singleSelect
    amount_to_be_paid: number // formula, currency
    due: string // formula, date (ISO 8601 string)
    payment_number: number
    paid_overwrite: boolean
    payment_status: PaymentStatus // formula
    paid_date?: string // optional ISO 8601 string
    paid_amount?: number
    bank?: BankAccount // singleSelect
    desc?: string
    contract_status: string[] // lookup from contract (usually one value, still comes as array)
    tenant: string[] // lookup
    nickname: string[] // lookup
    start_date: string[] // lookup (dates as ISO 8601 strings)
    rent: number[] // lookup (currency)
    common_fee: number[] // lookup (currency)
    '5%': boolean[] // lookup of checkbox (usually single true/false in array)
  }

  interface MaintenanceFields {
    id: number // autoNumber
    date: string // date (ISO string)
    property_id: string[] // linked record ID(s) to Property table
    nickname: string[] // lookup from property.nickname
    details: string // multilineText
    cost: number // number with precision 2
    repair_or_asset: RepairOrAsset // singleSelect: "repair" or "asset"
  }

  interface ImageObject {
    id: string
    url: string
    filename: string
    size: number
    type: string
    width: number
    height: number
  }

  enum PaymentType {
    DEPOSIT = "Security Deposit",
    RENT = "Rent"
  }

  enum PaymentStatus {
    NOTDUE = "Not Due",
    PAID = "Paid",
    OVERDUE = "Overdue"
  }

  enum BankAccount {
    RENT = "kbank rent",
    CASH = "cash",
    PUB = "kbank pub",
    MOM = "kbank mom",
    NUI = "scb nui"
  }

  enum RepairOrAsset {
    REPAIR = "repair",
    ASSET = "asset",
  }


  // interface for internal use
  interface Contract {
    airtableId: string
    id: number
    propertyAId: string
    nickname: string
    tenant: string
    contractStatus: ContractStatus
    startDate: date
    duration: number
    endDate: date
    rent: number
    commonFee: number
    tax: boolean
    paymentAId?: string[]
    // soft_file: string[]
  }

  interface Property {
    airtableId: string
    id: number
    nickname: string
    address?: string
    description?: string
    gMap?: string
    images: ImageObject[]
    contract: string[]
    offTrack: boolean
    maxRent: number
    daysLeft: number
    launchDate: Date | null
    currentContractId?: number
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

  interface ContractWithOverdue extends Contract {
    overdue: Payment[] | null
  }

  interface PropertyWithContract extends Property {
    currentContract: Contract | null
  }

  interface Maintenance {
    airtableId: string
    id: number
    date: Date
    propertyId: number
    nickname: string
    details: string
    cost: number
    repairOrAsset: RepairOrAsset
  }
}

// Add this line to make the file a module
export { }
