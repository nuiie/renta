"use client"

import {
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface RevenueChartDataEntity {
  month: string
  revenue: number
  missing: number
}

export default function RevenueChart({
  chartData,
}: {
  chartData: RevenueChartDataEntity[]
}) {
  // Function to format Y-axis labels with "k" suffix
  const formatYAxis = (tickItem: number) => {
    return `${tickItem / 1000}k`
  }

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" stackId="a" fill="#4caf50" />{" "}
        {/* Green color for revenue */}
        <Bar dataKey="missing" stackId="a" fill="#ff4d4d" />{" "}
        {/* Red color for missing */}
      </BarChart>
    </ResponsiveContainer>
  )
}
