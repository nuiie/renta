import { getContract } from "@/lib/directFetchAirtable"
import ContractBrowser from "@/components/ContractBrowser"

export default async function Contracts() {
  const contractRecords = await getContract()

  // Map contract records to the expected format
  const contracts = contractRecords.map(record => {
    // Map the contract status to the enum value
    let contractStatus: "Ongoing" | "Expired" | "Terminated"
    switch (record.fields.contract_status) {
      case "Ongoing":
        contractStatus = "Ongoing"
        break
      case "Expired":
        contractStatus = "Expired"
        break
      case "Terminated":
        contractStatus = "Terminated"
        break
      default:
        console.warn(`Invalid contract status: ${record.fields.contract_status} for contract ${record.id}`)
        contractStatus = "Expired" // Default to Expired for invalid status
    }

    return {
      id: record.fields.id,
      propertyAId: record.fields.property?.[0] || '',
      nickname: record.fields.nickname?.[0] || 'Unknown Property',
      tenant: record.fields.tenant,
      contractStatus: contractStatus as any, // Type assertion to bypass the enum type check
      startDate: new Date(record.fields.start_date),
      duration: record.fields.duration,
      endDate: new Date(record.fields.end_date),
      rent: record.fields.rent,
      commonFee: record.fields.common_fee,
      tax: record.fields["5%"] || false,
      paymentAId: record.fields.payment || [],
      airtableId: record.id
    }
  }).sort((a, b) => b.id - a.id)

  return <ContractBrowser contracts={contracts} />
}
