import ContractBrowser from "@/components/ContractBrowser"
import { getContracts } from "@/lib/airtable"

export default async function ContractsPage() {
  const contracts = await getContracts({ current: false })
  return <ContractBrowser contracts={contracts} />
}
