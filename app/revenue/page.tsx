import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, ArrowRight, Calendar } from "lucide-react"
import { getRevenueChartData } from "@/lib/directFetchAirtable"
import { toCurrency } from "@/lib/utils"

export default async function RevenuePage() {
  const revenueData = await getRevenueChartData(6)

  // Calculate current month data
  const currentMonth = revenueData[0]
  const expectedRevenue = currentMonth.revenue + currentMonth.missing
  const collectedRevenue = currentMonth.revenue
  const collectionRate = expectedRevenue > 0 ? Math.round((collectedRevenue / expectedRevenue) * 100) : 0

  // Calculate trend compared to previous month
  const previousMonth = revenueData[1]
  const previousRate = previousMonth.revenue + previousMonth.missing > 0
    ? Math.round((previousMonth.revenue / (previousMonth.revenue + previousMonth.missing)) * 100)
    : 0
  const rateDiff = collectionRate - previousRate
  const trend = rateDiff > 0 ? "up" : rateDiff < 0 ? "down" : "same"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Revenue Performance</h1>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Monthly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-gray-500">Current Month</p>
                  <p className="font-medium">{currentMonth.month}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expected Revenue</p>
                  <p className="font-medium">{toCurrency(expectedRevenue)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Collected</p>
                  <p className="font-medium">{toCurrency(collectedRevenue)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Collection Rate</p>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">{collectionRate}%</p>
                    <Badge variant="outline" className="text-xs">
                      {trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
                      {trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                      {trend === "same" && <ArrowRight className="h-3 w-3 text-gray-500 mr-1" />}
                      {Math.abs(rateDiff)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {revenueData.map((month, index) => {
              const expected = month.revenue + month.missing
              const collected = month.revenue
              const rate = expected > 0 ? Math.round((collected / expected) * 100) : 0

              // Calculate trend compared to previous month
              const prevMonth = revenueData[index + 1]
              const prevRate = prevMonth && (prevMonth.revenue + prevMonth.missing) > 0
                ? Math.round((prevMonth.revenue / (prevMonth.revenue + prevMonth.missing)) * 100)
                : 0
              const monthRateDiff = rate - prevRate
              const monthTrend = monthRateDiff > 0 ? "up" : monthRateDiff < 0 ? "down" : "same"

              return (
                <Card key={month.month}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      {month.month}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-gray-500">Expected Revenue</p>
                        <p className="font-medium">{toCurrency(expected)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Collected</p>
                        <p className="font-medium">{toCurrency(collected)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Collection Rate</p>
                        <div className="flex items-center gap-1">
                          <p className="font-medium">{rate}%</p>
                          <Badge variant="outline" className="text-xs">
                            {monthTrend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
                            {monthTrend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                            {monthTrend === "same" && <ArrowRight className="h-3 w-3 text-gray-500 mr-1" />}
                            {Math.abs(monthRateDiff)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="quarterly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly View</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quarterly data will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly View</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yearly data will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Collection Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              {
                property: "71/53 พฤกษา",
                tenant: "ลูกค้า",
                amount: "฿6,940.00",
                days: 18,
                impact: "high",
              },
              {
                property: "181/26 ติดเขา",
                tenant: "นาย สมชาย",
                amount: "฿22,000.00",
                days: 138,
                impact: "critical",
              },
              {
                property: "181/30 ติดเขา",
                tenant: "นาย วิชัย",
                amount: "฿11,000.00",
                days: 46,
                impact: "medium",
              },
              {
                property: "เรือนเจ้าพระยา",
                tenant: "บจก. ABC",
                amount: "฿5,000.00",
                days: 40,
                impact: "medium",
              },
            ].map((issue, i) => (
              <div key={i} className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{issue.property}</p>
                  <Badge
                    variant={
                      issue.impact === "critical"
                        ? "destructive"
                        : issue.impact === "high"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {issue.impact === "critical" && "Critical"}
                    {issue.impact === "high" && "High"}
                    {issue.impact === "medium" && "Medium"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-sm">
                  <p className="text-gray-500">Tenant</p>
                  <p>{issue.tenant}</p>
                  <p className="text-gray-500">Outstanding</p>
                  <p>{issue.amount}</p>
                  <p className="text-gray-500">Days Late</p>
                  <p>{issue.days} days</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
