import {
  getOverduePayments,
  getAllContract,
  getAllProperty,
} from "@/lib/airtable"

import {
  Property,
  LatePayment,
  Revenue,
  Transaction,
} from "@/components/dashboard/index"

import { getRecentTransaction } from "@/lib/google"

export default async function Home() {
  const properties = await getAllProperty()
  const transactions = (await getRecentTransaction()) as string[][]
  const overduePayments = await getOverduePayments()
  const contracts = await getAllContract()
  const contractsWithOverdue = mapContractToOverdue(contracts, overduePayments)

  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <Property properties={properties} />
        <LatePayment
          contractsWithOverdue={contractsWithOverdue}
          properties={properties}
        />
        <Revenue transactions={transactions} />
        <Transaction transactions={transactions} n={10} />
      </div>
    </div>
  )
}

interface ContractWithOverdue extends Contract {
  overdue: Payment[] | null
}

function mapContractToOverdue(
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
