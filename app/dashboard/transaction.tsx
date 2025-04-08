import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTransaction } from "@/lib/google"
import { retry } from "@/lib/retry"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export

  async function Transaction() {
  try {
    const transactions = await retry(() => getTransaction(), {
      maxAttempts: 3,
      initialDelay: 1000,
    })

    const data = (transactions as string[][])
      .slice(-10)
      .toReversed()
      .map((t) => ({
        date: t[0],
        method: t[1],
        amount: !!t[2] ? `-${t[2]}` : t[3],
        balance: t[4],
        from: t[6],
      }))

    return (
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Recent Transactions
          </CardTitle>
          <Link
            href="https://docs.google.com/spreadsheets/d/1mdj7QGLWoRbLCb6mKqlarUeKvhxo5IzryEMCmiLxHss/edit?usp=sharing"
            className="text-xs text-blue-600 flex items-center"
            target="_blank"
          >
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="divide-y">
            {data.map((transaction, i) => (
              <div key={i} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.date}</p>
                  <p className="text-gray-500 text-xs">{transaction.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <p className="text-gray-500 text-xs">{transaction.from}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Failed to load transactions:", error)
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="p-3 text-red-500">Failed to load transactions. Please try again later.</div>
        </CardContent>
      </Card>
    )
  }
}

export function TransactionLoading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 flex justify-between items-center">
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="text-right">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mx-auto" />
      </CardContent>
    </Card>
  )
}