import { getOverduePayments, getAllContract } from "@/lib/airtable"
import { calculateDaysDifference, formatDateDDMMYY } from "@/lib/utils"

export default async function Home() {
  const overduePayments = await getOverduePayments()
  const contracts = await getAllContract()
  const contractWithOverdue = mapContractToOverdue(contracts, overduePayments)

  return (
    <div className="w-full mx-6">
      dashboard
      <ul>
        <li>total revenue</li>
        <li>occupancy rate</li>
        <li>total properties</li>
        <li>income chart - 6 months</li>
        <li>
          late payment list
          <ul>
            <li>
              <b>181/29</b>
              <br />5 days late - 12,000 thb
            </li>
            <li>
              <b>181/30</b>
              <br />
              15,000 thb - 19 days late
              <br />
              15,000 thb - month 19 days late
              <br />
              30,000 thb - total
            </li>
          </ul>
        </li>
        <li>
          recent transaction
          <ul>
            <li>2/1/25 181/22 rent +12,000</li>
            <li>12/2/25 แสงทอง asset -30,000</li>
            <li>13/5/25 ส่วนกลาง utility -450</li>
          </ul>
        </li>
      </ul>
      <OverduePaymentsCard contractsWithOverdue={contractWithOverdue} />
    </div>
  )
}

function OverduePaymentsCard({
  contractsWithOverdue,
}: {
  contractsWithOverdue: ContractWithOverdue[]
}) {
  console.log(contractsWithOverdue[0])
  return (
    <div>
      {/* {payments.map((p) => (
        <ul key={p.airtableId}>
          {p.contractAId}
          <li>{formatDateDDMMYY(p.due)}</li>
          <li>{calculateDaysDifference(p.due)} days late</li>
        </ul>
      ))} */}
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
