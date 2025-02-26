declare global {
  interface Property {
    airtableId: string
    id: number
    nickname: string
    address?: string
    description?: string
    gMap?: string
    //image: string[]
    contract: string[]
    offTrack: boolean
    maxRent: number
    daysLeft: number
  }

  enum ContractStatus {
    ONGOING = "Ongoing",
    EXPIRED = "Expired",
    TERMINATED = "Terminated",
    // DRAFT = "Draft",
  }

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

  enum PaymentType {
    DEPOSIT = "Security Deposit",
    RENT = "Rent",
  }

  enum PaymentStatus {
    NOTDUE = "Not Due",
    PAID = "Paid",
    OVERDUE = "Overdue",
  }

  enum BankAccount {
    RENT = "kbank rent",
    CASH = "cash",
    PUB = "kbank pub",
    MOM = "kbank mom",
    NUI = "scb nui",
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
    paidDate: Date
    paidAmount: number
    bank: BankAccount
    desc: string
  }
}

export default global
