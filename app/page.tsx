import React, { Suspense } from "react"
import {
  Property,
  Revenue,
  LatePayment,
  Transaction,
} from "@/components/dashboard"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function Home() {
  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <ErrorBoundary fallback={<p>Error loading properties.</p>}>
          <Suspense fallback={<p>Loading properties...</p>}>
            <Property />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading revenue.</p>}>
          <Suspense fallback={<p>Loading revenue...</p>}>
            <Revenue />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading late payments.</p>}>
          <Suspense fallback={<p>Loading late payments...</p>}>
            <LatePayment />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading transactions.</p>}>
          <Suspense fallback={<p>Loading transactions...</p>}>
            <Transaction />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
