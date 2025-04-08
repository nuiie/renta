import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProperty } from "@/lib/directFetchAirtable"
import { retry } from "@/lib/retry"
import { toCurrency } from "@/lib/utils"

export async function Property() {
  try {
    const properties = await retry(() => getProperty(), {
      maxAttempts: 3,
      initialDelay: 1000,
    })

    const active = properties?.filter((p) => p.daysLeft > 0)
    const activeSum = active?.reduce((acc, curr) => acc + curr.maxRent, 0)
    const activeCount = active?.length

    const inactive = properties?.filter((p) => p.daysLeft <= 0)
    const inactiveSum = inactive?.reduce((acc, curr) => acc + curr.maxRent, 0)
    const inactiveCount = inactive?.length

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Property Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Active Properties</p>
              <p className="font-medium">{activeCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="font-medium">฿{toCurrency(activeSum)}</p>
            </div>
            <div>
              <p className="text-gray-500">Inactive Properties</p>
              <p className="font-medium">{inactiveCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Missing Revenue</p>
              <p className="font-medium text-red-500">฿{toCurrency(inactiveSum)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Failed to load property data:", error)
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Property Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="text-red-500">Failed to load property data. Please try again later.</div>
        </CardContent>
      </Card>
    )
  }
}

export function PropertyLoading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Property Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}