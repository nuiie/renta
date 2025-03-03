import { getProperties } from "./airtable"

const p = await getProperties()
console.log(p[3])
