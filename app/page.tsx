import {
  getOverduePayments,
  getAllContract,
  getAllProperty,
} from "@/lib/airtable"
import {
  calculateDaysDifference,
  formatDateDDMMYY,
  toCurrency,
} from "@/lib/utils"

import { getRecentTransaction } from "@/lib/google"

import {
  DashboardProperty,
  DashboardRevenue,
  DashboardRecentTransactions,
} from "@/components/dashboard"

export default async function Home() {
  const properties = await getAllProperty()
  const transactions = (await getRecentTransaction()) as string[][]

  return (
    <div className="mx-6 max-w-lg">
      <div className="grid grid-cols-1 gap-4">
        <DashboardProperty properties={properties} />
        <LocalLatePayments />
        <DashboardRevenue transactions={transactions} />
        <DashboardRecentTransactions transactions={transactions} n={10} />
      </div>
    </div>
  )
}

async function LocalLatePayments() {
  const properties = await getAllProperty()
  const overduePayments = await getOverduePayments()
  const contracts = await getAllContract()
  const contractsWithOverdue = mapContractToOverdue(contracts, overduePayments)
  return (
    <div className="p-8 border border-black">
      late payments
      <div className="grid grid-cols-1 gap-4">
        {contractsWithOverdue.map((c) => {
          const p = properties.find((p) => p.airtableId === c.propertyAId)
          if (!p) return null
          return (
            <OverduePaymentsCard
              key={p.airtableId}
              contractWithOverdue={c}
              property={p}
            />
          )
        })}
      </div>
    </div>
  )
}

function OverduePaymentsCard({
  contractWithOverdue,
  property,
}: {
  contractWithOverdue: ContractWithOverdue
  property: Property
}) {
  const { tenant, overdue } = contractWithOverdue

  //display only if there are overdue payments
  if (!overdue) return null
  const total = overdue?.reduce(
    (acc, curr) => acc + parseFloat(curr.amountToBePaid.replace(/,/g, "")),
    0
  )
  return (
    <div
      className={
        "border border-gray-300 p-4 my-4 inline-block " +
        (overdue?.length ? "bg-red-100" : "")
      }
    >
      <div>{property.nickname}</div>
      <div>
        {tenant} - {overdue?.length} bills {toCurrency(total ?? 0)} thb
      </div>
      {overdue &&
        overdue
          .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
          .map((p) => (
            <div key={p.airtableId}>
              {p.amountToBePaid} - {calculateDaysDifference(p.due)} days late -
              due [{formatDateDDMMYY(p.due)}]
            </div>
          ))}
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
