declare global {
  interface Contract {
    airtableId: string
    property: string
    tenant?: string
    rent: number
    status?: string
    startDate?: Date
  }
}

export default global
