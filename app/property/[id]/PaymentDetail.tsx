import { getPayment } from "@/lib/directFetchAirtable"
import PaymentHistory from "@/components/PaymentHistory"

export default async function PaymentDetail({
  contractId,
}: {
  contractId: number
}) {
  const payments = await getPayment({ contractId: contractId })
  console.log('payments', payments)
  return (
    <div>
      {/* <PaymentHistory payments={payments} /> */}
      Payment
    </div>
  )
}
