import base from "../lib/airtable"

export default async function Home() {
  const property = await base("property")
    .select({
      view: "Grid view",
    })
    .firstPage()

  console.log(property)
  return (
    <div>
      <h1>Dashboard</h1>
      <p>all property</p>
      <ul>
        {property.map((p) => {
          const { "House No.": h, Description: desc } = p.fields
          return <li key={p.id}>{`${h} ${desc}`}</li>
        })}
      </ul>
    </div>
  )
}
