import {
  calculateDaysDifference,
  formatDateDDMMYY,
  toCurrency,
} from "@/lib/utils"

export default function LatePayment({
  contractsWithOverdue,
  properties,
}: {
  contractsWithOverdue: ContractWithOverdue[]
  properties: Property[]
}) {
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

interface ContractWithOverdue extends Contract {
  overdue: Payment[] | null
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
