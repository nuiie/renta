import Airtable from "airtable"
import { log } from "console"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export interface Property {
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
        id: r.fields.id,
        no: r.fields["House No."],
        desc: r.fields.Description,
      }))
      res.sort((a, b) => a.id - b.id)
      return res
    })
}

export default base
