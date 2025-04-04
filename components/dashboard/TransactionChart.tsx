"use client"

export default function Revenue({
  transactions,
}: {
  transactions: Array<Array<string>>
}) {
  // discard tx > 100k
  const filteredTx = transactions.filter(
    (row) =>
      parseFloat(row[2].replace(/,/g, "")) < 100000 ||
      parseFloat(row[3].replace(/,/g, "")) < 100000
  )
  const chartData = transformStatementData(filteredTx, 12)
  return (
    <div>
      <StackedBarChart chartData={chartData} />
    </div>
  )
}

function transformStatementData(
  transactions: Array<Array<string>>,
  month: number
) {
  const monthlySummary: {
    [key: string]: { inbound: number; outbound: number }
  } = {}
  transactions.forEach((row) => {
    const [dateStr, , outbound, inbound] = row
    const [, month, year] = dateStr.split("/")
    const monthKey = `${getMonthName(month)}-${year.slice(-2)}`

    if (!monthlySummary[monthKey]) {
      monthlySummary[monthKey] = {
        inbound: 0,
        outbound: 0,
      }
    }
    if (inbound) {
      monthlySummary[monthKey].inbound += parseFloat(inbound.replace(/,/g, ""))
    }
    if (outbound) {
      monthlySummary[monthKey].outbound += parseFloat(
        outbound.replace(/,/g, "")
      )
    }
  })
  return Object.entries(monthlySummary)
    .map(([month, { inbound, outbound }]) => ({
      month,
      inbound,
      outbound,
    }))
    .slice(-month)
}

function getMonthName(month: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return months[parseInt(month, 10) - 1] // Convert month number to name
}

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  inbound: {
    label: "inbound",
    color: "hsl(var(--chart-2))",
  },
  outbound: {
    label: "outbound",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ChartData {
  month: string
  inbound: number
  outbound: number
}

function StackedBarChart({ chartData }: { chartData: ChartData[] }) {
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`
    }
    return value.toString()
  }

  const calculateTrend = (data: ChartData[]) => {
    if (data.length < 2) return { trend: "up", percentage: 0 }

    const latest = data[data.length - 1]
    const previous = data[data.length - 2]

    const latestTotal = latest.inbound + latest.outbound
    const previousTotal = previous.inbound + previous.outbound

    const percentageChange =
      ((latestTotal - previousTotal) / previousTotal) * 100

    return {
      trend: percentageChange >= 0 ? "up" : "down",
      percentage: Math.abs(parseFloat(percentageChange.toFixed(1))),
    }
  }

  const { trend, percentage } = calculateTrend(chartData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction</CardTitle>
        <CardDescription>Monthly summary</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickFormatter={formatYAxis} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="inbound" fill="var(--color-inbound)" radius={4} />
            <Bar dataKey="outbound" fill="var(--color-outbound)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending {trend} by {percentage}% this month{" "}
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total inbound and outbound for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
