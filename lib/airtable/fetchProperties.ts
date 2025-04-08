const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID


export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/property?view=Grid%20view`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: {
        revalidate: 86400, // cache for 1 day
        tags: ['property']
      }
    }
  )

  if (!res.ok) throw new Error('Failed to fetch properties')

  const data = await res.json()

  return data.records.map((record: any) => ({
    airtableId: record.id,
    id: record.fields.id,
    nickname: record.fields.nickname || '',
    address: record.fields.address || '',
    description: record.fields.description || '',
    gMap: record.fields.g_maps || '',
    contract: record.fields.contract || [],
    offTrack: record.fields.off_track || false,
    maxRent: record.fields.max_rent || 0,
    daysLeft: record.fields.days_left || 0,
    launchDate: record.fields.launch_date ? new Date(record.fields.launch_date) : null,
    images: record.fields.images || [],
    currentContractId: record.fields.current_contract?.[0] || undefined
  }))
}
