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
    paymentType: PaymentType
  }

  enum ContractStatus {
    ongoing,
    expired,
    terminated,
    draft,
  }

  enum PaymentType {
    monthly,
    yearly,
  }

  interface Property {
    airtableId: string
    id: number
    no?: string
    desc?: string
    contract?: string[]
  }
}

export default global
