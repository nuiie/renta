import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPayment } from "@/lib/directFetchAirtable"
import { retry } from "@/lib/retry"
import { calculateDaysDifference, formatDateDDMMYY, toCurrency } from "@/lib/utils"

export async function LatePayment() {
  try {
    const latePayments = await retry(() => getPayment({ overdue: true }), {
      maxAttempts: 3,
      initialDelay: 1000,
    })

    type GroupedPayment = {
      totalAmount: number
      payments: Payment[]
      maxDaysLate: number
    }

    const groupedPayments = latePayments.reduce<Record<string, GroupedPayment>>((acc, payment) => {
      const nickname = payment.nickname
      if (!acc[nickname]) {
        acc[nickname] = {
          totalAmount: 0,
          payments: [],
          maxDaysLate: 0
        }
      }
      acc[nickname].totalAmount += payment.amountToBePaid
      acc[nickname].payments.push(payment)
      acc[nickname].maxDaysLate = Math.max(
        acc[nickname].maxDaysLate,
        calculateDaysDifference(payment.due)
      )
      return acc
    }, {})

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
  } catch (error) {
    console.error("Failed to load late payments:", error)
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Late Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="p-3 text-red-500">Failed to load late payments. Please try again later.</div>
        </CardContent>
      </Card>
    )
  }
}

export function LatePaymentLoading() {
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
