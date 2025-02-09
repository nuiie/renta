import { getAllProperty, Property } from "../lib/airtable"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const allProperty: Property[] = (await getAllProperty()) as Property[]

  // todo
  // 1. red, green property text decided by ongoing contract
  // 2. put badge of contract behind property
  //    rent amount as title, sort by date
  return (
    <div>
      <h1>Dashboard</h1>
      <p>all property</p>
      <ul>
        {allProperty?.map((p) => (
          <li key={p.id}>{`${p.no} ${p.desc}`}</li>
        ))}
      </ul>{" "}
      o
    </div>
  )
}
