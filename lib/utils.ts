import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateDDMMYY(d: Date) {
  const date = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()
  const formattedDate = `${date}/${month}/${year}`
  return formattedDate
}

export function calculateDaysDifference(givenDate: Date): number {
  const today = new Date()

  // Calculate the difference in time
  const timeDifference = today.getTime() - givenDate.getTime()

  // Convert time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

  return daysDifference
}

export function toCurrency(amount: number): string {
  return amount.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function mapContractToOverdue(
  contracts: Contract[],
  overduePayments: Payment[]
) {
  const contractWithOverdue: ContractWithOverdue[] = contracts.map((c) => {
    const overdue = overduePayments.filter(
      (p) => p.contractAId === c.airtableId
    )
    return { ...c, overdue: overdue.length > 0 ? overdue : null }
  })

  return contractWithOverdue
}

export function getLastNMonths(n = 18): string[] {
  //return informat ["Mar-25", "Feb-25",...]
  const months: string[] = []
  const date = new Date()
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  for (let i = 0; i < n; i++) {
    const year = date.getFullYear() % 100 // Get last two digits of the year
    const month = monthNames[date.getMonth()] // Get month name
    months.push(`${month}-${year}`)

    // Move to previous month
    date.setMonth(date.getMonth() - 1)
  }
  return months
}

export function getFirstAndLastDay(
  today: Date,
  months: number
): {
  firstDay: string
  lastDay: string
} {
  // Get the last day of the current month
  const lastDayDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const lastDay = `${lastDayDate.getFullYear()}-${(lastDayDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${lastDayDate.getDate().toString().padStart(2, "0")}`

  // Get the first day of the month 18 months ago
  const firstDayDate = new Date(
    today.getFullYear(),
    today.getMonth() - (months - 1),
    1
  )
  const firstDay = `${firstDayDate.getFullYear()}-${(
    firstDayDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-01`

  return { firstDay, lastDay }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
