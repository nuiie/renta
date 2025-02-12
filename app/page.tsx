import { getAllProperty, Property, getAllContract } from "../lib/airtable"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const allProperty: Property[] = (await getAllProperty()) as Property[]
  const allContract = await getAllContract()

  const propertyWithContract = mapContractToProperty(allContract, allProperty)

  // todo
  // 1. red, green property text decided by ongoing contract
  // 2. put badge of contract behind property
  //    rent amount as title, sort by date
  return (
    <div className="w-full mx-6">
      <ul>
        {/* {allProperty?.map((p) => (
          <li key={p.id}>{`${p.no} - ${p.desc}`}</li>
        ))} */}
        {Object.keys(propertyWithContract).map((key) => {
          return (
            <li key={key}>
              {`${propertyWithContract[key].no} - ${propertyWithContract[key].desc}`}{" "}
              <BadgeGroup contract={propertyWithContract[key].contract} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function BadgeGroup({ contract }) {
  const reactNode = Object.keys(contract).map((key) => (
    <Badge
      key={key}
      variant={contract[key].status == "Ongoing" ? "default" : "secondary"}
      date={contract[key]["start date"]}
    >
      {`${contract[key].Rent.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} [${contract[key]["start date"]}]`}
    </Badge>
  ))

  //sort badge by date
  reactNode.sort((a, b) => {
    return new Date(b.props.date) - new Date(a.props.date)
  })
  return reactNode
}

function mapContractToProperty(contract, property) {
  // put property to object, key is airtable id of property
  // put contract to object by key
  const newProperty = {}
  property.map((p) => {
    const { airtableId, ...rest } = p
    newProperty[airtableId] = { ...rest, contract: {} }
  })

  contract.map((c) => {
    const { property, airtableId, ...rest } = c
    newProperty[property[0]]["contract"][airtableId] = { ...rest }
  })
  return newProperty
}
