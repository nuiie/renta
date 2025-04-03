import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, ArrowRight, Calendar } from "lucide-react"

export default function RevenuePage() {
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
                  <p className="font-medium">Mar 2025</p>
                </div>
                <div>
                  <p className="text-gray-500">Expected Revenue</p>
                  <p className="font-medium">฿163,671.06</p>
                </div>
                <div>
                  <p className="text-gray-500">Collected</p>
                  <p className="font-medium">฿142,231.06</p>
                </div>
                <div>
                  <p className="text-gray-500">Collection Rate</p>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">87%</p>
                    <Badge variant="outline" className="text-xs">
                      <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      3%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {[
              {
                month: "Mar 2025",
                expected: "฿163,671.06",
                collected: "฿142,231.06",
                rate: "87%",
                trend: "down",
                diff: "3%",
              },
              {
                month: "Feb 2025",
                expected: "฿163,671.06",
                collected: "฿147,303.95",
                rate: "90%",
                trend: "up",
                diff: "2%",
              },
              {
                month: "Jan 2025",
                expected: "฿163,671.06",
                collected: "฿143,213.18",
                rate: "88%",
                trend: "same",
                diff: "0%",
              },
              {
                month: "Dec 2024",
                expected: "฿163,671.06",
                collected: "฿139,120.40",
                rate: "85%",
                trend: "down",
                diff: "5%",
              },
              {
                month: "Nov 2024",
                expected: "฿163,671.06",
                collected: "฿147,303.95",
                rate: "90%",
                trend: "up",
                diff: "3%",
              },
              {
                month: "Oct 2024",
                expected: "฿163,671.06",
                collected: "฿142,893.68",
                rate: "87%",
                trend: "down",
                diff: "1%",
              },
            ].map((month, i) => (
              <Card key={i}>
                <CardContent className="p-3">
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
                    <p className="text-gray-500">Expected</p>
                    <p className="text-right">{month.expected}</p>
                    <p className="text-gray-500">Collected</p>
                    <p className="text-right">{month.collected}</p>
                    <p className="text-gray-500">Rate</p>
                    <p className="text-right font-medium">{month.rate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quarterly" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Quarterly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-gray-500">Current Quarter</p>
                  <p className="font-medium">Q1 2025</p>
                </div>
                <div>
                  <p className="text-gray-500">Expected Revenue</p>
                  <p className="font-medium">฿491,013.18</p>
                </div>
                <div>
                  <p className="text-gray-500">Collected</p>
                  <p className="font-medium">฿432,748.19</p>
                </div>
                <div>
                  <p className="text-gray-500">Collection Rate</p>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">88%</p>
                    <Badge variant="outline" className="text-xs">
                      <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      2%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {[
              {
                quarter: "Q1 2025",
                expected: "฿491,013.18",
                collected: "฿432,748.19",
                rate: "88%",
                trend: "up",
                diff: "2%",
              },
              {
                quarter: "Q4 2024",
                expected: "฿491,013.18",
                collected: "฿422,318.03",
                rate: "86%",
                trend: "down",
                diff: "1%",
              },
              {
                quarter: "Q3 2024",
                expected: "฿491,013.18",
                collected: "฿427,181.47",
                rate: "87%",
                trend: "same",
                diff: "0%",
              },
              {
                quarter: "Q2 2024",
                expected: "฿491,013.18",
                collected: "฿436,701.73",
                rate: "89%",
                trend: "up",
                diff: "3%",
              },
            ].map((quarter, i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="font-medium">{quarter.quarter}</p>
                    </div>
                    <Badge
                      variant={
                        quarter.trend === "up"
                          ? "default"
                          : quarter.trend === "down"
                          ? "destructive"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {quarter.trend === "up" && (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      )}
                      {quarter.trend === "down" && (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {quarter.trend === "same" && (
                        <ArrowRight className="h-3 w-3 mr-1" />
                      )}
                      {quarter.diff}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <p className="text-gray-500">Expected</p>
                    <p className="text-right">{quarter.expected}</p>
                    <p className="text-gray-500">Collected</p>
                    <p className="text-right">{quarter.collected}</p>
                    <p className="text-gray-500">Rate</p>
                    <p className="text-right font-medium">{quarter.rate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Yearly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-gray-500">Current Year</p>
                  <p className="font-medium">2025</p>
                </div>
                <div>
                  <p className="text-gray-500">Expected Revenue</p>
                  <p className="font-medium">฿1,964,052.72</p>
                </div>
                <div>
                  <p className="text-gray-500">Collected</p>
                  <p className="font-medium">฿432,748.19</p>
                </div>
                <div>
                  <p className="text-gray-500">YTD Collection Rate</p>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">88%</p>
                    <Badge variant="outline" className="text-xs">
                      <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      1%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Annual Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  {
                    year: "2025",
                    expected: "฿1,964,052.72",
                    collected: "฿432,748.19 (YTD)",
                    rate: "88%",
                    trend: "up",
                    diff: "1%",
                  },
                  {
                    year: "2024",
                    expected: "฿1,964,052.72",
                    collected: "฿1,708,949.42",
                    rate: "87%",
                    trend: "up",
                    diff: "2%",
                  },
                  {
                    year: "2023",
                    expected: "฿1,845,649.56",
                    collected: "฿1,569,302.13",
                    rate: "85%",
                    trend: "down",
                    diff: "3%",
                  },
                  {
                    year: "2022",
                    expected: "฿1,764,052.72",
                    collected: "฿1,552,366.39",
                    rate: "88%",
                    trend: "same",
                    diff: "0%",
                  },
                ].map((year, i) => (
                  <div key={i} className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <p className="font-medium">{year.year}</p>
                      </div>
                      <Badge
                        variant={
                          year.trend === "up"
                            ? "default"
                            : year.trend === "down"
                            ? "destructive"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {year.trend === "up" && (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        )}
                        {year.trend === "down" && (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {year.trend === "same" && (
                          <ArrowRight className="h-3 w-3 mr-1" />
                        )}
                        {year.diff}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                      <p className="text-gray-500">Expected</p>
                      <p className="text-right">{year.expected}</p>
                      <p className="text-gray-500">Collected</p>
                      <p className="text-right">{year.collected}</p>
                      <p className="text-gray-500">Rate</p>
                      <p className="text-right font-medium">{year.rate}</p>
                    </div>
                  </div>
                ))}
              </div>
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
