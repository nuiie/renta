import { getContracts } from "@/lib/airtable"
import ContractBrowser from "@/components/ContractBrowser"

// Sample data
// const contracts = [
//   {
//     id: "CTR-2023-001",
//     property: "Sunset Apartments, Unit 303",
//     tenant: "John Doe",
//     status: "Active",
//   },
//   {
//     id: "CTR-2023-002",
//     property: "Ocean View Condos, Unit 512",
//     tenant: "Jane Smith",
//     status: "Active",
//   },
//   {
//     id: "CTR-2022-015",
//     property: "Mountain Retreat Cabin",
//     tenant: "Robert Johnson",
//     status: "Expired",
//   },
// ]

export default async function ContractsPage() {
  const contracts = await getContracts({ current: false })
  return <ContractBrowser contracts={contracts} />
}
