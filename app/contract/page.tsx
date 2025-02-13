import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllContract } from "@/lib/airtable"

export default async function Contract() {
  const contracts: Contract[] = await getAllContract()

  // console.log(contracts)
  return (
    <section className="mx-6">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">active</TabsTrigger>
          <TabsTrigger value="inactive">inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {contracts
            .filter((c) => c.status == "Ongoing")
            .map((c) => (
              <li key={c.airtableId}>{`${c.rent} ${c.tenant}`}</li>
            ))}
        </TabsContent>
        <TabsContent value="inactive">
          {contracts
            .filter((c) => c.status != "Ongoing")
            .map((c) => (
              <li key={c.airtableId}>{`${c.rent} ${c.tenant}`}</li>
            ))}
        </TabsContent>
      </Tabs>
      <hr className="my-4" />
      payments
    </section>
  )
}
