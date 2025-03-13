"use client"

import PropertyBrowser from "@/components/property-browser"
// import { getPropertiesWithContract } from "@/lib/airtable"
import { useGlobalState } from "@/context/GlobalStateContext"

export default function Property() {
  // const propertiesWithContract = await getPropertiesWithContract()
  const { airtableData, loading } = useGlobalState()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!airtableData) {
    return <div>airtable data not found</div>
  }
  return (
    <section className="px-6 max-w-md">
      <PropertyBrowser properties={airtableData.properties} />
    </section>
  )
}
