import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Transaction({
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
