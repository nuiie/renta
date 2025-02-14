import { getPaymentsFromContract } from "@/lib/airtable"
import { formatDateDDMMYY } from "@/lib/utils"

export default async function Payment({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  const payments = await getPaymentsFromContract(id)

  return (
    <section className="px-6">
      <div>Payment from contract {id}</div>
      <div>
        {payments.map((p) => (
          <div key={p.id}>
            {p.id} {p.no} {p.amountToBePaid} {formatDateDDMMYY(p.due)}{" "}
            {p.status} {p.desc}
          </div>
        ))}
      </div>
    </section>
  )
}
