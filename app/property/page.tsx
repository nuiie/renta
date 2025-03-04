import PropertyBrowser from "@/components/property-browser"
import { getPropertiesWithContract } from "@/lib/airtable"

export default async function Property() {
  const propertiesWithContract = await getPropertiesWithContract()
  return (
    <section className="px-6 max-w-md">
      <PropertyBrowser properties={propertiesWithContract} />
    </section>
  )
}
