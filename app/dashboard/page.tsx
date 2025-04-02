import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getProperties, getPayments } from "@/lib/airtable"
import { Suspense } from "react"
import { calculateDaysDifference, formatDateDDMMYY, toCurrency } from "@/lib/utils"
// import { LatePayment } from "@/components/dashboard"

export default async function Dashboard() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<PropertyLoading />}>
        <Property />
      </Suspense>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Revenue Performance
          </CardTitle>
          <Link
            href="/revenue"
            className="text-xs text-blue-600 flex items-center"
          >
            View Details <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-gray-500">Current Month</p>
            <p className="text-right font-medium">Mar 2025</p>

            <p className="text-gray-500">Expected</p>
            <p className="text-right">฿163,671.06</p>

            <p className="text-gray-500">Collected</p>
            <p className="text-right">฿142,231.06</p>

            <p className="text-gray-500">Collection Rate</p>
            <div className="flex items-center justify-end gap-1">
              <p className="font-medium">87%</p>
              <Badge variant="outline" className="text-xs text-red-500">
                ↓ 3%
              </Badge>
            </div>

            <p className="text-gray-500">Last Month</p>
            <div className="flex items-center justify-end gap-1">
              <p>90%</p>
              <Badge variant="outline" className="text-xs text-green-500">
                ↑ 2%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        <LatePayment />
      </Suspense>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="divide-y">
            {[
              {
                date: "17/03/2025",
                method: "โอนเงิน",
                amount: "฿32,000.00",
                from: "จาก X249",
              },
              {
                date: "15/03/25",
                method: "โอนเงิน",
                amount: "฿12,000.00",
                from: "จาก X967",
              },
              {
                date: "14/03/25",
                method: "โอนเงิน",
                amount: "฿5,440.00",
                from: "จาก X822",
              },
              {
                date: "10/03/25",
                method: "โอนเงิน",
                amount: "฿12,000.00",
                from: "จาก BBL",
              },
            ].map((transaction, i) => (
              <div key={i} className="py-3 flex justify-between items-center">
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
          <Link
            href="/transactions"
            className="block text-center mt-2 text-sm text-blue-600 hover:underline"
          >
            View all transactions
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

async function Property() {
  const [properties, latePayments] = await Promise.all([
    getProperties(),
    getPayments({ overdue: true }),
  ])
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
          <div>
            <p className="text-gray-500">Late Payments</p>
            <p className="font-medium text-red-500">{latePayments.length}</p>
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
      <CardContent className="text-sm">
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
      </CardContent>
    </Card>
  )
}

async function LatePayment() {
  const latePayments = await getPayments({ overdue: true })
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Late Payments</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="divide-y">
          {latePayments.map((payment, i) => (
            <div key={i} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{payment.nickname}</p>
                <p className="text-gray-500 text-xs">Due: {formatDateDDMMYY(payment.due)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{toCurrency(payment.amountToBePaid)}</p>
                <Badge variant="destructive" className="text-xs">
                  {calculateDaysDifference(payment.due)} days late
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/payments"
          className="block text-center mt-2 text-sm text-blue-600 hover:underline"
        >
          View all late payments
        </Link>
      </CardContent>
    </Card>
  )
}