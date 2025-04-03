import { getMaintenance } from "@/lib/airtable"

export default async function Maintenance() {
  const maintenanceData = await getMaintenance()
  return (
    <section className="px-6">
      {maintenanceData.map((r) => (
        <li key={r.airtableId}>{r.details}</li>
      ))}
    </section>
  )
}
