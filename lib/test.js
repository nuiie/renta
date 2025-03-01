import { getPayments, getContracts } from "./airtable"

const [payments, contracts] = await Promise.all([
  getPayments({ overdue: true }),
  getContracts(),
])

console.log("payments", payments.length, "contracts", contracts.length)

function mapOverdueContracts(contracts, payments) {
  return contracts
    .map((contract) => {
      const overduePayments = contract.paymentAId.filter((paymentId) => {
        const payment = payments.find((p) => p.airtableId === paymentId)
        return payment?.paymentStatus === "Overdue"
      })

      if (overduePayments.length > 0) {
        return {
          ...contract,
          paymentAId: overduePayments,
        }
      }
      return null
    })
    .filter((contract) => contract !== null)
}

console.log(mapOverdueContracts(contracts, payments))
