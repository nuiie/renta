import { getProperties, getPayments, getContracts } from "@/lib/airtable"

import {
  Property,
  LatePayment,
  Revenue,
  Transaction,
} from "@/components/dashboard/index"

import { getRecentTransaction } from "@/lib/google"

export default async function Home() {
  const properties = await getProperties()
  // const transactions = await getRecentTransaction()
  // const overduePayments = await getPayments({ overdue: true })
  // const contracts = await getContracts()
  // const contractsWithOverdue = mapContractToOverdue(contracts, overduePayments)
  console.log(properties)
  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        {/* <Property properties={properties} /> */}
        {/* <LatePayment
          contractsWithOverdue={contractsWithOverdue}
          properties={properties}
        // /> */}
        {/* // <Revenue transactions={transactions} />
        // <Transaction transactions={transactions} n={10} /> */}
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
