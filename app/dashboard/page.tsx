import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowRight, ArrowUp, Calendar } from "lucide-react"
import { getProperty, getRevenueChartData } from "@/lib/directFetchAirtable"
import { Suspense } from "react"
import { calculateDaysDifference, formatDateDDMMYY, toCurrency } from "@/lib/utils"
import { getTransaction } from "@/lib/google"

export default async function Dashboard() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<PropertyLoading />}>
        <Property />
      </Suspense>

      <Suspense fallback={<RevenuePerformanceLoading />}>
        <RevenuePerformance />
      </Suspense>

      <Suspense fallback={<LatePaymentLoading />}>
        <LatePayment />
      </Suspense>
      <Suspense fallback={<TransactionLoading />}>
        <Transaction />
      </Suspense>
    </div>

  )
}

async function Property() {
  const properties = await getProperty()

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
}

function PropertyLoading() {
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

async function LatePayment() {
  const latePayments = await getPayments({ overdue: true })

  // Group payments by tenant nickname
  const groupedPayments = latePayments.reduce((acc, payment) => {
    if (!acc[payment.nickname]) {
      acc[payment.nickname] = {
        totalAmount: 0,
        payments: [],
        maxDaysLate: 0
      }
    }
    acc[payment.nickname].totalAmount += payment.amountToBePaid
    acc[payment.nickname].payments.push(payment)
    acc[payment.nickname].maxDaysLate = Math.max(
      acc[payment.nickname].maxDaysLate,
      calculateDaysDifference(payment.due)
    )
    return acc
  }, {} as Record<string, { totalAmount: number; payments: typeof latePayments; maxDaysLate: number }>)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Late Payments</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="divide-y">
          {Object.entries(groupedPayments).map(([nickname, { totalAmount, payments, maxDaysLate }]) => (
            <div key={nickname} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{nickname}</p>
                  <p className="text-gray-500 text-xs">
                    {payments.length} payment{payments.length > 1 ? 's' : ''} overdue
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-500">{toCurrency(totalAmount)}</p>
                  <p className="text-gray-500 text-xs">
                    Up to {maxDaysLate} days late
                  </p>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {payments.map((payment, i) => (
                  <div key={i} className="flex justify-between items-center text-xs text-gray-500 pl-2 border-l-2 border-gray-100">
                    <div>
                      <p>Due: {formatDateDDMMYY(payment.due)}</p>
                    </div>
                    <div className="text-right">
                      <p>{toCurrency(payment.amountToBePaid)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}

function LatePaymentLoading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Late Payments</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="divide-y">
          {[1, 2].map((i) => (
            <div key={i} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mt-1 h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="text-right">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mt-1 h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {[1, 2].map((j) => (
                  <div key={j} className="flex justify-between items-center pl-2 border-l-2 border-gray-100">
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mx-auto" />
      </CardContent>
    </Card>
  )
}

async function RevenuePerformance() {
  const chartData = await getRevenueChartData(4)

  // Calculate rates and trends
  const data = chartData.map((month, index) => {
    const revenue = month.revenue
    const missing = month.missing
    const total = revenue + missing
    const rate = total > 0 ? Math.round((revenue / total) * 100) : 0

    // Calculate trend by comparing with previous month
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
}

function RevenuePerformanceLoading() {
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

async function Transaction() {
  const transactions = await getTransaction()
  const data = (transactions as string[][])
    .slice(-10)
    .toReversed()
    .map((t) => ({
      date: t[0],
      method: t[1],
      amount: !!t[2] ? `-${t[2]}` : t[3],
      balance: t[4],
      from: t[6],
    }))
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
        <Link
          href="https://docs.google.com/spreadsheets/d/1mdj7QGLWoRbLCb6mKqlarUeKvhxo5IzryEMCmiLxHss/edit?usp=sharing"
          className="text-xs text-blue-600 flex items-center"
          target="_blank"
        >
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="divide-y">
          {data.map((transaction, i) => (
            <div key={i} className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.date}</p>
                <p className="text-gray-500 text-xs">{transaction.method}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{transaction.amount}</p>
                <p className="text-gray-500 text-xs">{transaction.from}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TransactionLoading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 flex justify-between items-center">
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="text-right">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mx-auto" />
      </CardContent>
    </Card>
  )
}