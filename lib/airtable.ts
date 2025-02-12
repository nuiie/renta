import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export interface Property {
  airtableId: number
  id: number
  no?: string
  desc?: string
  contract?: number[]
}

export const getAllProperty = () => {
  return base("property")
    .select({
      fields: ["id", "House No.", "Description"],
      //filterByFormula: "NOT({Contract}='')",
    })
    .firstPage()
    .then((records) => {
      const res: Property[] = records?.map((r) => ({
        airtableId: r.getId(),
        id: r.fields.id,
        no: r.fields["House No."],
        desc: r.fields.Description,
      }))
      res.sort((a, b) => a.id - b.id)
      return res
    })
}

export const getAllContract = () => {
  return base("contract")
    .select({
      fields: ["property", "Rent", "status", "start date", "Tenant"],
    })
    .firstPage()
    .then((records) => {
      const res = records?.map((r) => ({
        airtableId: r.getId(),
        ...r.fields,
        rent: r.fields.Rent.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        property: ensure(r.fields.property[0]),
        tenant: r.fields.Tenant,
      }))
      return res
    })
}

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message)
  }

  return argument
}

export default base
