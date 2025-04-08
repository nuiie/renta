import { getContract } from "@/lib/directFetchAirtable"
import ContractBrowser from "./ContractBrowser"

export default async function Contracts() {
  const contracts = await getContract()

  // Sort contracts by ID in descending order
  const sortedContracts = contracts.sort((a, b) => b.id - a.id)

  return <ContractBrowser contracts={sortedContracts} />
}
