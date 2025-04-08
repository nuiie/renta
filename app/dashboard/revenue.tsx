import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRevenueChartData } from "@/lib/directFetchAirtable"
import { retry } from "@/lib/retry"
import { toCurrency } from "@/lib/utils"
import { ArrowDown, ArrowRight, ArrowUp, Calendar } from "lucide-react"

export async function RevenuePerformance() {
  try {
    const chartData = await retry(() => getRevenueChartData(4), {
      maxAttempts: 3,
      initialDelay: 1000,
    })

    const data = chartData.map((month, index) => {
      const revenue = month.revenue
      const missing = month.missing
      const total = revenue + missing
      const rate = total > 0 ? Math.round((revenue / total) * 100) : 0

      let trend = "same"
      let diff = "0%"

      if (index > 0) {
        const prevRate = (chartData[index - 1].revenue / (chartData[index - 1].revenue + chartData[index - 1].missing)) * 100
        const rateDiff = rate - prevRate

        if (rateDiff > 0) {
          trend = "up"
          diff = `+${Math.round(Math.abs(rateDiff))}%`
        } else if (rateDiff < 0) {
          trend = "down"
          diff = `-${Math.round(Math.abs(rateDiff))}%`
        }
      }

      return {
        month: month.month,
        revenue: toCurrency(revenue),
        missing: toCurrency(missing),
        rate: `${rate}%`,
        trend,
        diff
      }
    }).reverse()

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Revenue Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="divide-y">
            {data.map((month, i) => (
              <div key={i} className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="font-medium">{month.month}</p>
                  </div>
                  <Badge
                    variant={
                      month.trend === "up"
                        ? "default"
                        : month.trend === "down"
                          ? "destructive"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {month.trend === "up" && (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    )}
                    {month.trend === "down" && (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {month.trend === "same" && (
                      <ArrowRight className="h-3 w-3 mr-1" />
                    )}
                    {month.diff}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-sm">
                  <p className="text-gray-500">Revenue</p>
                  <p className="text-right">{month.revenue}</p>
                  <p className="text-gray-500">Missing</p>
                  <p className="text-right text-red-500">{month.missing}</p>
                  <p className="text-gray-500">Rate</p>
                  <p className="text-right font-medium">{month.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Failed to load revenue performance:", error)
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Revenue Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="p-3 text-red-500">Failed to load revenue performance. Please try again later.</div>
        </CardContent>
      </Card>
    )
  }
}

export function RevenuePerformanceLoading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Revenue Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="h-5 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700 ml-auto" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700 ml-auto" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}