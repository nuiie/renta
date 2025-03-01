import {
  Property,
  Revenue,
  LatePayment,
  Transaction,
} from "@/components/dashboard"
import { Suspense } from "react"

export default async function Home() {
  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <Suspense fallback={<p>loading properties...</p>}>
          <Property />
        </Suspense>
        <Suspense fallback={<p>loading revenue...</p>}>
          <Revenue />
        </Suspense>
        <Suspense fallback={<p>loading latepayment...</p>}>
          <LatePayment />
        </Suspense>
        <Suspense fallback={<p>loading transaction...</p>}>
          <Transaction />
        </Suspense>
      </div>
    </div>
  )
}
