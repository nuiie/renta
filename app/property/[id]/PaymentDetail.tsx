import { getPayments } from "@/lib/airtable"
import PaymentHistory from "@/components/PaymentHistory"

export default async function PaymentDetail({
  contractId,
}: {
  contractId: number
}) {
  const payments = await getPayments({ contractId: contractId })

  return (
    <div>
      <PaymentHistory payments={payments} />
    </div>
  )
}
