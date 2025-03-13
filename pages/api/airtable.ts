import type { NextApiRequest, NextApiResponse } from "next"
import { getProperties, getPayments, getContracts } from "@/lib/airtable"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [properties, contracts, payments] = await Promise.all([
      getProperties(),
      getContracts({ current: false }),
      getPayments(),
    ])

    const propertiesWithContract = properties.map((property) => {
      const currentContract = contracts
        .filter((c) => c.contractStatus == "Ongoing")
        .find((contract) => contract.propertyAId === property.airtableId)
      return {
        ...property,
        currentContract: currentContract || null,
      }
    })

    const data = { contracts, payments, properties: propertiesWithContract }
    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: "Failed to fetch airtable data" })
  }
}
