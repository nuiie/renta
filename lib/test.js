import { fetchProperties } from '@/lib/airtable/fetchProperties'

const properties = await fetchProperties()

console.log(properties)