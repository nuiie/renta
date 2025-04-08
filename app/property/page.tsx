import { Suspense } from "react"
import { getProperty } from "@/lib/directFetchAirtable"
import { PropertyBrowser, PropertyBrowserSkeleton } from "./property-browser"

// Main page component
export default async function PropertyPage() {
  const properties = await getProperty()
  return (
    <Suspense fallback={<PropertyBrowserSkeleton />}>
      <PropertyBrowser initialProperties={properties} />
    </Suspense>
  )
}
