import { getProperties } from "@/lib/airtable"
import { Property } from "@/components/dashboard"

export default async function Home() {
  const properties = await getProperties()

  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <Property properties={properties} />
      </div>
    </div>
  )
}
