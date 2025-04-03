
import { getContracts } from "@/lib/airtable"
import ContractBrowser from "@/components/ContractBrowser"

export default async function Contracts() {
  const contracts = (await getContracts({ current: false })).sort((a, b) => b.id - a.id)
  return <ContractBrowser contracts={contracts} />
}
