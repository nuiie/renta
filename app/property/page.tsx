import { Suspense } from "react"
import { fetchProperties } from "@/lib/airtable/fetchProperties"
import { PropertyBrowser, PropertyBrowserSkeleton } from "./property-browser"

// Main page component
export default async function PropertyPage() {
  const properties = await fetchProperties()
  return (
    <Suspense fallback={<PropertyBrowserSkeleton />}>
      <PropertyBrowser initialProperties={properties} />
    </Suspense>
  )
}
