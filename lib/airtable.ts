import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export const getAllProperty = () => {
  return base("property")
    .select({
      // fields: ["id", "House No.", "Description"],
    })
    .firstPage()
    .then((records) => {
      const res: Property[] = records?.map((r) => ({
        airtableId: r.getId(),
        id: r.fields.id,
        no: r.fields["House No."],
        desc: r.fields.Description,
        ...r.fields,
      }))
      res.sort((a, b) => a.id - b.id)
      return res
    })
}

export const getAllContract = () => {
  return base("contract")
    .select({})
    .firstPage()
    .then((records) => {
      const res = records?.map(
        (r): Contract => ({
          airtableId: r.getId(),
          id: r.fields.id as number,
          property: r.fields.property[0] as string,
          tenant: r.fields.Tenant as string,
          rent: r.fields.Rent?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }) as string,
          tax: r.fields["5%"] as boolean,
          startDate: r.fields["start date"] as string,
          endDate: r.fields["end date"] as string,
          duration: r.fields.duration as number,
          status: r.fields.status as ContractStatus,
          paymentAID: r.fields.payment as string[],
          paymentType: r.fields["Payment type"] as PaymentType,
        })
      )
      return res
    })
}

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message)
  }

  return argument
}

export default base
