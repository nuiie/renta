import { Property, RevenueChart } from "@/components/dashboard"
import { Suspense } from "react"
import { getRevenueChartData } from "@/lib/airtable"

export default async function Home() {
  const chartData = await getRevenueChartData(6)
  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <Suspense fallback={<p>loading properties...</p>}>
          <Property />
        </Suspense>
        <RevenueChart chartData={chartData} />
      </div>
    </div>
  )
}
