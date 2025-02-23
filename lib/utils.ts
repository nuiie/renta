import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateDDMMYY(d: Date) {
  const date = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()
  const formattedDate = `${date}-${month}-${year}`
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
