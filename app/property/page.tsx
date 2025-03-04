import ProductBrowser from "@/components/product-browser"
import { getPropertiesWithContract } from "@/lib/airtable"

export default async function Property() {
  const propertiesWithContract = await getPropertiesWithContract()
  return (
    <section className="px-6 max-w-md">
      <ProductBrowser properties={propertiesWithContract} />
    </section>
  )
}
