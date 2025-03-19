import React from "react"
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
          <Property />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading revenue.</p>}>
          <Revenue />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading late payments.</p>}>
          <LatePayment />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading transactions.</p>}>
          <Transaction />
        </ErrorBoundary>
      </div>
    </div>
  )
}
