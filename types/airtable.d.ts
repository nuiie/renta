declare global {
  interface Contract {
    airtableId: string
    id: number
    property: string
    tenant: string
    rent: string
    tax: boolean
    startDate: string
    endDate: string
    duration: number
    status: ContractStatus
    paymentAID?: string[]
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
    airtableId: number
    id: number
    no?: string
    desc?: string
    contract?: string[]
  }
}

export default global
