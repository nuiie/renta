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

export function DashboardRevenue() {
  return (
    <div>
      <StackedBarChart />
    </div>
  )
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
