import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { getPayment } from "@/lib/directFetchAirtable"
import { formatDateDDMMYY, toCurrency } from "@/lib/utils"

export async function PaymentDetail({ contractId }: { contractId: string }) {
  // Fetch payments filtered by contract ID directly from the API
  const payments = await getPayment({ contractId: parseInt(contractId) })

  if (payments.length === 0) {
    return null
  }

  const totalDue = payments.reduce((acc, payment) => acc + payment.amountToBePaid, 0)
  const totalPaid = payments.filter(p => p.paymentStatus === "Paid").reduce((acc, payment) => acc + payment.paidAmount, 0)
  const remaining = totalDue - totalPaid

  // Calculate on-time and late payments with 5-day grace period
  const { onTimePayments, latePayments, totalDaysLate } = payments.reduce((acc, payment) => {
    if (payment.paymentStatus === "Paid" && payment.paidDate) {
      const daysLate = Math.max(0, Math.ceil((payment.paidDate.getTime() - payment.due.getTime()) / (1000 * 60 * 60 * 24)))
      if (daysLate <= 5) {
        acc.onTimePayments++
      } else {
        acc.latePayments++
        acc.totalDaysLate += daysLate
      }
    } else if (payment.paymentStatus === "Overdue") {
      acc.latePayments++
    }
    return acc
  }, { onTimePayments: 0, latePayments: 0, totalDaysLate: 0 })

  const avgDaysLate = latePayments > 0 ? Math.round(totalDaysLate / latePayments) : 0

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-gray-500">Total Due</p>
            <p className="text-right font-medium">
              {toCurrency(totalDue)}
            </p>

            <p className="text-gray-500">Total Paid</p>
            <p className="text-right">{toCurrency(totalPaid)}</p>

            <p className="text-gray-500">Remaining</p>
            <p className="text-right">{toCurrency(remaining)}</p>

            <p className="text-gray-500">On-time Payments</p>
            <p className="text-right">
              {onTimePayments} of {payments.length}
            </p>

            <p className="text-gray-500">Late Payments</p>
            <p className="text-right">
              {latePayments} of {payments.length}
            </p>

            {latePayments > 0 && (
              <>
                <p className="text-gray-500">Avg. Days Late</p>
                <p className="text-right">
                  {avgDaysLate} days
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Payment History
          </CardTitle>
          {/* <Button size="sm" className="gap-1 h-8">
            <DollarSign className="h-4 w-4" /> Record
          </Button> */}
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-xs">
            <div className="grid grid-cols-12 gap-x-1 px-3 py-2 font-medium bg-gray-50 dark:bg-gray-800">
              <div className="col-span-3">Period</div>
              <div className="col-span-3">Due Date</div>
              <div className="col-span-3 text-right">Amount</div>
              <div className="col-span-3 text-right">Status</div>
            </div>

            <div className="divide-y max-h-[400px] overflow-y-auto">
              {payments.sort((a, b) => a.paymentNumber - b.paymentNumber).map((payment, i) => (
                payment.paymentStatus === "Not Due" ? (
                  <div key={i} className="grid grid-cols-12 gap-x-1 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="col-span-3 font-medium">
                      #{payment.paymentNumber} {payment.paymentType}
                    </div>
                    <div className="col-span-3">{formatDateDDMMYY(payment.due)}</div>
                    <div className="col-span-3 text-right">
                      {toCurrency(payment.amountToBePaid)}
                    </div>
                    <div className="col-span-3 text-right">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {payment.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <details key={i} className="group">
                    <summary className="grid grid-cols-12 gap-x-1 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 list-none">
                      <div className="col-span-3 font-medium">
                        #{payment.paymentNumber} {payment.paymentType}
                      </div>
                      <div className="col-span-3">{formatDateDDMMYY(payment.due)}</div>
                      <div className="col-span-3 text-right">
                        {toCurrency(payment.amountToBePaid)}
                      </div>
                      <div className="col-span-3 text-right">
                        <Badge
                          variant={
                            payment.paymentStatus === "Paid"
                              ? "default"
                              : "destructive"
                          }
                          className="text-[10px] px-1.5 py-0"
                        >
                          {payment.paymentStatus}
                        </Badge>
                      </div>
                    </summary>

                    {/* Expanded details */}
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs">
                      {payment.paymentStatus === "Paid" ? (
                        <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                          <p className="text-gray-500">Paid Date</p>
                          <p>{payment.paidDate ? formatDateDDMMYY(payment.paidDate) : ""}</p>

                          <p className="text-gray-500">Paid Amount</p>
                          <p>{toCurrency(payment.paidAmount)}</p>

                          <p className="text-gray-500">Bank</p>
                          <p>{payment.bank || ""}</p>

                          <p className="text-gray-500">Note</p>
                          <p>{payment.desc || ""}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-500 justify-between">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <p>Payment is overdue</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                )
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export function PaymentDetailSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Payment History
        </CardTitle>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-xs">
          <div className="grid grid-cols-12 gap-x-1 px-3 py-2 font-medium bg-gray-50 dark:bg-gray-800">
            <div className="col-span-3">Period</div>
            <div className="col-span-3">Due Date</div>
            <div className="col-span-3 text-right">Amount</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          <div className="divide-y max-h-[400px] overflow-y-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="grid grid-cols-12 gap-x-1 px-3 py-2">
                  <div className="col-span-3">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="col-span-3">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="col-span-3 text-right">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                  </div>
                  <div className="col-span-3 text-right">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}