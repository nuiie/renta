import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export const getAllProperty = () => {
  return base("property")
    .select()
    .firstPage()
    .then((records): Property[] => {
      const res = records?.map(
        (r): Property => ({
          //return array of this object
          airtableId: r.getId() as string,
          id: r.fields.id as number,
          no: r.fields["House No."] as string,
          desc: r.fields.Description as string,
          contract: r.fields.Contract as string[],
        })
      )
      res.sort((a, b) => a.id - b.id)
      return res
    })
}

export const getAllContract = () => {
  return base("contract")
    .select()
    .firstPage()
    .then((records): Contract[] => {
      const res = records?.map(
        (r): Contract => ({
          // return array of this object
          airtableId: r.getId(),
          id: r.fields.id as number,
          propertyAId: (<string[]>r.fields.property)?.[0],
          tenant: r.fields.Tenant as string,
          rent: r.fields.Rent?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }) as string,
          tax: (r.fields["5%"] as boolean) ?? false,
          startDate: new Date(r.fields["start date"] as string),
          endDate: new Date(r.fields["end date"] as string),
          duration: r.fields["duration (months)"] as number,
          status: (<string>(
            r.fields.status
          )).toLowerCase() as unknown as ContractStatus,
          paymentAId: (r.fields.payment as string[]) ?? [],
          paymentType: r.fields["Payment type"] as PaymentType,
        })
      )
      res.sort((a, b) => a.id - b.id)
      return res
    })
}

export const getPaymentsFromContract = (
  contractId: number
): Promise<Payment[]> => {
  return base("payment")
    .select({
      filterByFormula: `{Contract No.}=${contractId}`,
    })
    .firstPage()
    .then((records) => {
      return records
        .map(
          (r): Payment => ({
            airtableId: r.getId(),
            id: r.fields.id as number,
            contractAId: (<string[]>r.fields["Contract No."])?.[0] as string,
            due: new Date(r.fields.Due as string),
            status: r.fields.Status as PaymentStatus,
            type: r.fields.Type as RentPaymentType,
            no: r.fields["payment number"] as number,
            amountToBePaid: r.fields["Amount to be paid"]?.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ) as string,
            paidDate: new Date(r.fields["Paid Date"] as string),
            paidAmount: r.fields["Paid Amount"]?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }) as string,
            bank: r.fields.Bank as BankAccount,
            desc: r.fields.Desc as string,
          })
        )
        .sort((a, b) => a.no - b.no)
    })
}

export default base
