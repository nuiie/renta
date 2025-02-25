declare global {
  interface Contract {
    airtableId: string
    id: number
    propertyAId: string
    tenant: string
    rent: string
    tax: boolean
    startDate: date
    endDate: date
    duration: number
    status: ContractStatus
    paymentAId?: string[]
  }

  enum ContractStatus {
    ONGOING = "Ongoing",
    EXPIRED = "Expired",
    TERMINATED = "Terminated",
    DRAFT = "Draft",
  }

  interface Property {
    airtableId: string
    id: number
    nickname: string
    address?: string
    description?: string
    gMap?: string
    offTrack?: boolean
    maxRent: number
    daysLeft: number
    contract: string[]
  }

  enum RentPaymentType {
    RENT = "Rent",
    DEPOSIT = "Security Deposit",
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
    due: Date
    status: PaymentStatus
    type: RentPaymentType
    paymentNumber: number
    amountToBePaid: string
    paidDate: Date
    paidAmount: string
    bank: BankAccount
    desc: string
  }
}

export default global
