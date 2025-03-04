import { getPayments, getContracts } from "@/lib/airtable"
import {
  toCurrency,
  calculateDaysDifference,
  formatDateDDMMYY,
} from "@/lib/utils"

export default async function LatePayment() {
  const [payments, contracts] = await Promise.all([
    getPayments({ overdue: true }),
    getContracts({ current: false }),
  ])
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

function filterContractWithOverdue(
  contracts: Contract[],
  payments: Payment[]
): Contract[] {
  return contracts
    .map((contract) => {
      const overduePayments = contract.paymentAId?.filter((paymentId) => {
        const payment = payments.find((p) => p.airtableId === paymentId)
        return payment?.paymentStatus === "Overdue"
      })

      if (overduePayments && overduePayments.length > 0) {
        return {
          ...contract,
          paymentAId: overduePayments,
        }
      }
      return null
    })
    .filter((contract) => contract !== null) as Contract[]
}
