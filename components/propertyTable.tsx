import { Badge } from "@/components/ui/badge"
import { formatDateDDMMYY } from "@/lib/utils"

// 1. red, green property text decided by ongoing contract
// 2. put badge of contract behind property
//    rent amount as title, sort by date
export default function PropertyTable({
  properties,
  contracts,
}: {
  properties: Property[]
  contracts: Contract[]
}) {
  const propertyWithContract = mapContractToProperty(contracts, properties)

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>house</th>
            <th>contracts</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(propertyWithContract).map((key) => {
            return (
              <tr key={key}>
                <td>{propertyWithContract[key].id}</td>
                <td>
                  {propertyWithContract[key].no}{" "}
                  {propertyWithContract[key].desc}
                </td>
                <td>
                  <BadgeGroup contract={propertyWithContract[key].contract} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

interface PropertyWithContract {
  [key: string]: {
    id: number
    no: string
    desc: string
    contract: {
      [key: string]: Contract
    }
  }
}

function mapContractToProperty(
  contract: Contract[],
  property: Property[]
): PropertyWithContract {
  // put property to object, key is airtable id of property
  // put contract to object by key
  const newProperty: PropertyWithContract = {}
  property.map((p) => {
    newProperty[p.airtableId] = {
      id: p.id || 0,
      no: p.no || "",
      desc: p.desc || "",
      contract: {},
    }
  })

  contract.map((c) => {
    newProperty[c.propertyAId]["contract"][c.airtableId] = { ...c }
  })

  return newProperty
}

function BadgeGroup({ contract }: { contract: { [key: string]: Contract } }) {
  const reactNode = Object.keys(contract)
    .sort(
      (a, b) =>
        new Date(contract[b].endDate).getTime() -
        new Date(contract[a].endDate).getTime()
    )
    .map((key) => (
      <Badge
        key={key}
        variant={
          contract[key].status.valueOf() == 0 // ongoing, work around because cannot compare enum to string
            ? "default"
            : "secondary"
        }
      >
        {contract[key]["rent"]} {formatDateDDMMYY(contract[key]["endDate"])}
      </Badge>
    ))
  return reactNode
}
