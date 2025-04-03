import PropertyBrowser from "@/components/property-browser"
import { getProperties } from "@/lib/airtable"

export default async function Property() {
  const properties = await getProperties()

  return (
    <section className="space-y-4 max-w-md">
      <PropertyBrowser properties={properties} />
    </section>
  )
}
