import RevenueChart from "./RevenueChart"
import { getProperty, getPayment } from "@/lib/directFetchAirtable"
import { getFirstAndLastDay } from "@/lib/utils"

export default async function Revenue() {
  const chartData = await getRevenueChartData(6)
  return <RevenueChart chartData={chartData} />
}

interface RevenueData {
  month: string
  revenue: number
  missing: number
  rate: string
  trend: 'up' | 'down' | 'same'
  diff: string
}

async function getRevenueChartData(months = 6): Promise<RevenueData[]> {
  const propertyRecords = await getProperty()
  const paymentRecords = await getPayment()

  // Get the current date and calculate the first and last day of each month
  const today = new Date()
  const data: RevenueData[] = []

  for (let i = 0; i < months; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const { firstDay, lastDay } = getFirstAndLastDay(date, 0)

    // Filter payments for this month
    const monthPayments = paymentRecords.filter(record => {
      const dueDate = new Date(record.fields.due)
      const firstDayDate = new Date(firstDay)
      const lastDayDate = new Date(lastDay)
      return dueDate >= firstDayDate && dueDate <= lastDayDate
    })

    // Calculate revenue and missing payments
    const revenue = monthPayments
      .filter(record => record.fields.payment_status === 'Paid')
      .reduce((sum, record) => sum + (record.fields.paid_amount || 0), 0)

    const missing = monthPayments
      .filter(record => record.fields.payment_status === 'Overdue')
      .reduce((sum, record) => sum + (record.fields.amount_to_be_paid || 0), 0)

    // Calculate rate (percentage of paid vs total)
    const total = monthPayments.reduce((sum, record) => sum + (record.fields.amount_to_be_paid || 0), 0)
    const rate = total > 0 ? `${Math.round((revenue / total) * 100)}%` : '0%'

    // Determine trend
    let trend: 'up' | 'down' | 'same' = 'same'
    if (i > 0) {
      const prevMonth = data[i - 1]
      if (revenue > prevMonth.revenue) trend = 'up'
      else if (revenue < prevMonth.revenue) trend = 'down'
    }

    // Format month name
    const monthName = date.toLocaleString('en-US', { month: 'long', year: '2-digit' })

    data.push({
      month: monthName,
      revenue: revenue,
      missing: missing,
      rate: rate,
      trend: trend,
      diff: i > 0 ? `${Math.round((revenue - data[i - 1].revenue) / data[i - 1].revenue * 100)}%` : '0%'
    })
  }

  return data
}
