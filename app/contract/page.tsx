import { getAllContract } from "@/lib/airtable"
import ContractTable from "@/components/contractTable"

export default async function Contract() {
  const contracts = await getAllContract()

  return (
    <section className="mx-6">
      <ContractTable contracts={contracts} />
    </section>
  )
}
