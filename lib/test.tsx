import { getAllProperty, getAllContract } from "./airtable"

const res = await getAllContract()
console.log(res[0])
