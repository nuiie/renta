import { toCurrency } from "@/lib/utils"
import { getProperties } from "@/lib/airtable"

export default async function Property() {
  const properties = await getProperties()

  const count = properties?.length
  const active = properties?.filter((p) => p.daysLeft > 0)
  const activeSum = active?.reduce((acc, curr) => acc + curr.maxRent, 0)
  const activeCount = active?.length

  const inactive = properties?.filter((p) => p.daysLeft <= 0)
  const inactiveSum = inactive?.reduce((acc, curr) => acc + curr.maxRent, 0)
  const inactiveCount = inactive?.length

  return (
    <div className="p-8 border border-black">
      <h1>property - {count} total</h1>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <table className="table-auto">
        <thead>
          <tr>
            <th>active property</th>
            <th>rent</th>
            <th>remaining</th>
          </tr>
        </thead>
        <tbody>
          {active
            ?.sort((a, b) => b.maxRent - a.maxRent)
            .map((p) => (
              <tr key={p.airtableId}>
                <td>{p.nickname}</td>
                <td className="text-end">{toCurrency(p.maxRent)}</td>
                <td className="text-end">{p.daysLeft} days</td>
              </tr>
            ))}
          <tr className="text-green-600 font-meduinm">
            <td>total active - {activeCount}</td>
            <td className="text-end">{toCurrency(activeSum)}</td>
            <td className="text-center">thb</td>
          </tr>
        </tbody>
      </table>

      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <table className="table-auto">
        <thead>
          <tr>
            <th>inactive property</th>
            <th>rent</th>
            <th>last active</th>
          </tr>
        </thead>
        <tbody>
          {inactive
            ?.sort((a, b) => b.maxRent - a.maxRent)
            .map((p) => (
              <tr key={p.airtableId}>
                <td>{p.nickname}</td>
                <td className="text-end">{toCurrency(p.maxRent)}</td>
                <td className="text-end">{-1 * p.daysLeft} days</td>
              </tr>
            ))}
          <tr className="text-red-500 font-meduinm">
            <td>total inactive - {inactiveCount}</td>
            <td className="text-end">{toCurrency(inactiveSum)}</td>
            <td className="text-center">thb</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
