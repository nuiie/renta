import { getPayment, getContract } from "@/lib/directFetchAirtable"
import {
  toCurrency,
  calculateDaysDifference,
  formatDateDDMMYY,
} from "@/lib/utils"

export default async function LatePayment() {
  const [paymentRecords, contractRecords] = await Promise.all([
    getPayment(),
    getContract(),
  ])

  // Filter overdue payments
  const payments = paymentRecords
    .filter(record => record.fields.payment_status === 'Overdue')
    .map(record => ({
      airtableId: record.id,
      contractAId: record.fields.contract_id,
      amountToBePaid: record.fields.amount_to_be_paid || 0,
      due: new Date(record.fields.due),
    }))

  // Map contracts to the expected format
  const contracts = contractRecords.map(record => ({
    airtableId: record.id,
    nickname: record.fields.nickname?.[0] || 'Unknown Property',
  }))

  const filteredContract = filterContractWithOverdue(contracts, payments)

  return (
    <div>
      laye payment
      {filteredContract.map((c) => {
        const overduePaymentsOfThisContract = payments.filter(
          (p) => p.contractAId == c.airtableId
        )
        const totalOverdueRent = overduePaymentsOfThisContract.reduce(
          (acc, p) => acc + p.amountToBePaid,
          0
        )
        return (
          <div key={c.airtableId}>
            <span className="text-red-500">
              {`${c.nickname} - total ${toCurrency(totalOverdueRent)} thb`}
            </span>
            {overduePaymentsOfThisContract.map((payment) => (
              <ContractCard key={payment.airtableId} payment={payment} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function ContractCard({ payment }: { payment: Payment }) {
  return (
    <p>
      {toCurrency(payment.amountToBePaid)} -{" "}
      {calculateDaysDifference(payment.due)} days late - (due_
      {formatDateDDMMYY(payment.due)})
    </p>
  )
}

// Define the Payment type
interface Payment {
  airtableId: string
  contractAId: string
  amountToBePaid: number
  due: Date
}

// Define the Contract type
interface Contract {
  airtableId: string
  nickname: string
}

function filterContractWithOverdue(
  contracts: Contract[],
  payments: Payment[]
): Contract[] {
  const contractIdsWithOverdue = new Set(
    payments.map((p) => p.contractAId)
  )
  return contracts.filter((c) => contractIdsWithOverdue.has(c.airtableId))
}
