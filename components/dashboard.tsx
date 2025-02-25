import StackedBarChart from "./stackedBarChart"
import { toCurrency } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardProperty({ properties }: { properties: Property[] }) {
  const count = properties?.length
  const active = properties?.filter((p) => p.daysLeft > 0)
  const activeSum = active?.reduce((acc, curr) => acc + curr.maxRent, 0)
  const activeCount = active?.length

  const inactive = properties?.filter((p) => p.daysLeft <= 0)
  const inactiveSum = inactive?.reduce((acc, curr) => acc + curr.maxRent, 0)
  const inactiveCount = inactive?.length

  console.log(properties[16].daysLeft)

  return (
    <div className="p-8 border border-black">
      <h1>property - {count} total</h1>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <table className="table-auto">
        <thead>
          <tr>
            <th>active property</th>
            <th>rent</th>
            <th>remaining</th>
          </tr>
        </thead>
        <tbody>
          {active
            ?.sort((a, b) => b.maxRent - a.maxRent)
            .map((p) => (
              <tr key={p.airtableId}>
                <td>{p.nickname}</td>
                <td className="text-end">{toCurrency(p.maxRent)}</td>
                <td className="text-end">{p.daysLeft} days</td>
              </tr>
            ))}
          <tr className="text-green-600 font-meduinm">
            <td>total active - {activeCount}</td>
            <td className="text-end">{toCurrency(activeSum)}</td>
            <td className="text-center">thb</td>
          </tr>
        </tbody>
      </table>

      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <table className="table-auto">
        <thead>
          <tr>
            <th>inactive property</th>
            <th>rent</th>
            <th>last active</th>
          </tr>
        </thead>
        <tbody>
          {inactive
            ?.sort((a, b) => b.maxRent - a.maxRent)
            .map((p) => (
              <tr key={p.airtableId}>
                <td>{p.nickname}</td>
                <td className="text-end">{toCurrency(p.maxRent)}</td>
                <td className="text-end">{-1 * p.daysLeft} days</td>
              </tr>
            ))}
          <tr className="text-red-500 font-meduinm">
            <td>total inactive - {inactiveCount}</td>
            <td className="text-end">{toCurrency(inactiveSum)}</td>
            <td className="text-center">thb</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function DashboardRevenue({
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

export function DashboardLatePayments() {
  return <div>late paymetns</div>
}

export function DashboardRecentTransactions({
  transactions,
  n = 10,
}: {
  transactions: Array<Array<string>>
  n: number
}) {
  const data = transactions
    .slice(-n)
    .toReversed()
    .map((t) => ({
      date: t[0],
      method: t[1],
      amount: !!t[2] ? `-${t[2]}` : t[3],
      balance: t[4],
      from: t[6],
    }))

  return (
    <Table>
      <TableCaption>recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">date</TableHead>
          <TableHead>method</TableHead>
          <TableHead className="text-right">amount</TableHead>
          <TableHead className="text-right">balance</TableHead>
          <TableHead>from</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.date + d.amount}>
            <TableCell>{d.date}</TableCell>
            <TableCell>{d.method}</TableCell>
            <TableCell className="text-right">{d.amount}</TableCell>
            <TableCell className="text-right">{d.balance}</TableCell>
            <TableCell>{d.from}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
