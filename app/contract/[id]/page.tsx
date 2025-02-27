// import { getPaymentsFromContract } from "@/lib/airtable"
// import { formatDateDDMMYY } from "@/lib/utils"

// export default async function Payment({
//   params,
// }: {
//   params: Promise<{ id: number }>
// }) {
//   const id = (await params).id
//   const payments = await getPaymentsFromContract(id)

//   return (
//     <section className="px-6">
//       <div>Payment from contract {id}</div>
//       <table className="divide-y divide-gray-200">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>No</th>
//             <th>Amount to be Paid</th>
//             <th>Due Date</th>
//             <th>Status</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((p) => (
//             <tr key={p.id}>
//               <td>{p.id}</td>
//               <td>{p.no}</td>
//               <td>{p.amountToBePaid}</td>
//               <td>{formatDateDDMMYY(p.due)}</td>
//               <td>{p.status}</td>
//               <td>{p.desc}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   )
// }
