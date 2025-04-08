import { Suspense } from "react"
import { Property, PropertyLoading } from "./property"
import { LatePayment, LatePaymentLoading } from "./latepayment"
import { RevenuePerformance, RevenuePerformanceLoading } from "./revenue"
import { Transaction, TransactionLoading } from "./transaction"

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
