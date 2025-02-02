import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base("appBNQZ6kc8ziiDRA")

export default base
