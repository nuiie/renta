import { Property } from "@/components/dashboard"
import { Suspense } from "react"

export default async function Home() {
  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <Suspense fallback={<p>loading properties...</p>}>
          <Property />
        </Suspense>
      </div>
    </div>
  )
}
