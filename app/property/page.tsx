import { Suspense } from "react"
import PropertyBrowser from "./property-browser"
// import { getProperty } from "@/lib/directFetchAirtable"
import { fetchProperties } from "@/lib/airtable/fetchProperties"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { PropertyBrowserSkeleton } from "./property-browser-skeleton"



// Error component with retry button
function PropertyError({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-red-500">Error Loading Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {error.message || "An error occurred while loading properties."}
        </p>
        <Button onClick={onRetry} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </CardContent>
    </Card>
  )
}

// Main page component
export default async function PropertyPage() {
  const properties = await fetchProperties()
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<PropertyBrowserSkeleton />}>
        <PropertyBrowser initialProperties={properties} />
      </Suspense>
    </div>
  )
}
