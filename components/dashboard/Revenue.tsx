import RevenueChart from "./RevenueChart"
import { getRevenueChartData } from "@/lib/airtable"

export default async function Revenue() {
  const chartData = await getRevenueChartData(6)
  return <RevenueChart chartData={chartData} />
}
