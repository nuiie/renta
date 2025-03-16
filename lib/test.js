import { getPayments } from "./airtable"

const res = await getPayments({ contractAId: "25" })

console.log(res)
