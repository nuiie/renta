import { getPaymentsFromContract } from "./airtable"

const a = await getPaymentsFromContract(11)
console.log(a[0])
