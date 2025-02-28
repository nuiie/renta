import { getProperties } from "@/lib/airtable"
import { Property } from "@/components/dashboard"

export default async function Home() {
  const { res: properties, updated } = await getProperties()

  return (
    <div className="mx-6 max-w-lg">
      <p>updated: {updated.toLocaleString("th-TH")} </p>
      <div className="grid grid-cols-1 gap-4">
        <Property properties={properties} />
      </div>
    </div>
  )
}
