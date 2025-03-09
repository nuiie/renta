import type { NextApiRequest, NextApiResponse } from "next"
import { getPropertiesWithContract } from "@/lib/airtable"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const propertiesWithContract = await getPropertiesWithContract()
    res.status(200).json(propertiesWithContract)
  } catch {
    res.status(500).json({ error: "Failed to fetch properties" })
  }
}
