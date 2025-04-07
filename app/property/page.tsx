import { Suspense } from "react"
import PropertyBrowser from "./property-browser"
import { getProperty } from "@/lib/directFetchAirtable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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

// Main property content component with retry mechanism
async function PropertyContent() {
  // This function will be called by the client component when retry is clicked
  async function fetchProperties() {
    try {
      const response = await getProperty()
      return response
    } catch (error) {
      throw error
    }
  }

  try {
    const properties = await fetchProperties()

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Property Management</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your rental properties
          </p>
        </div>

        <PropertyBrowser initialProperties={properties} />
      </div>
    )
  } catch (error) {
    return <PropertyError error={error as Error} onRetry={async () => {
      // This will trigger a re-render of the component
      window.location.reload()
    }} />
  }
}

// Main page component
export default function PropertyPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<PropertyBrowserSkeleton />}>
        <PropertyContent />
      </Suspense>
    </div>
  )
}
