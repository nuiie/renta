import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base("appBNQZ6kc8ziiDRA")

export const getAllProperty = () => {
  return base("property")
    .select({
      filterByFormula: `{off_track}=FALSE()`,
    })
    .firstPage()
    .then((records): Property[] => {
      const res = records?.map(
        (r): Property => ({
          airtableId: r.getId() as string,
          id: r.fields.id as number,
          nickname: r.fields.nickname as string,
          description: r.fields.description as string,
          gMap: r.fields.g_map as string,
          maxRent: r.fields.max_rent as number,

          // NaN in airtable will result in Object { specialValue: "NaN" }
          daysLeft:
            typeof r.fields.days_left == "number"
              ? (r.fields.days_left as number)
              : 0,
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
          airtableId: r.getId(),
          id: r.fields.id as number,
          propertyAId: (<string[]>r.fields.property)?.[0],
          tenant: r.fields.tenant as string,
          rent: r.fields.rent?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }) as string,
          tax: (r.fields["5%"] as boolean) ?? false,
          startDate: new Date(r.fields.start_date as string),
          endDate: new Date(r.fields.end_date as string),
          duration: r.fields.duration as number,
          status: (<string>(
            r.fields.contract_status
          )).toLowerCase() as unknown as ContractStatus,
          paymentAId: (r.fields.payment as string[]) ?? [],
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
      filterByFormula: `{contract_id}=${contractId}`,
    })
    .firstPage()
    .then((records) => {
      return records
        .map(
          (r): Payment => ({
            airtableId: r.getId(),
            id: r.fields.id as number,
            contractAId: (<string[]>r.fields.contract_id)?.[0] as string,
            due: new Date(r.fields.due as string),
            status: r.fields.payment_status as PaymentStatus,
            type: r.fields.type as RentPaymentType,
            paymentNumber: r.fields.payment_number as number,
            amountToBePaid: r.fields.amount_to_be_paid?.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ) as string,
            paidDate: new Date(r.fields.paid_date as string),
            paidAmount: r.fields.paid_amount?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }) as string,
            bank: r.fields.bank as BankAccount,
            desc: r.fields.desc as string,
          })
        )
        .sort((a, b) => a.paymentNumber - b.paymentNumber)
    })
}

export function getOverduePayments(): Promise<Payment[]> {
  const res = base("payment")
    .select({
      filterByFormula: `{payment_status}='Overdue'`,
    })
    .firstPage()
    .then((records) => {
      return records.map(
        (r): Payment => ({
          airtableId: r.getId(),
          id: r.fields.id as number,
          contractAId: (<string[]>r.fields.contract_id)?.[0] as string,
          due: new Date(r.fields.due as string),
          status: r.fields.payment_status as PaymentStatus,
          type: r.fields.type as RentPaymentType,
          paymentNumber: r.fields.payment_number as number,
          amountToBePaid: r.fields.amount_to_be_paid?.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }
          ) as string,
          paidDate: new Date(r.fields.paid_date as string),
          paidAmount: r.fields.paid_amount?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }) as string,
          bank: r.fields.bank as BankAccount,
          desc: r.fields.desc as string,
        })
      )
    })
  return res
}

export default base
