"use client"
import { useState } from "react"
import { formatDateDDMMYY } from "@/lib/utils"

export default function ContractTable({
  contracts,
}: {
  contracts: Contract[]
}) {
  const [filter, setFilter] = useState("all")

  return (
    <div>
      <ul className="inline-block">
        <li
          className={
            filter == "all"
              ? "bg-black text-white px-2 py-1 inline"
              : "cursor-pointer"
          }
          onClick={() => setFilter("all")}
        >
          all
        </li>
        <li
          className={
            filter == "ongoing"
              ? "bg-black text-white px-2 py-1 inline"
              : "cursor-pointer"
          }
          onClick={() => setFilter("ongoing")}
        >
          ongoing
        </li>
        <li
          className={
            filter == "expired"
              ? "bg-black text-white px-2 py-1 inline"
              : "cursor-pointer"
          }
          onClick={() => setFilter("expired")}
        >
          expired
        </li>
      </ul>
      <hr className="my-4" />

      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>tenant</th>
              <th>rent</th>
              <th>date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {filter == "all"
              ? contracts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.tenant}</td>
                    <td>{c.rent}</td>
                    <td>{formatDateDDMMYY(c.startDate)}</td>
                    <td>{c.status}</td>
                  </tr>
                ))
              : contracts
                  .filter(
                    (c) => c.status == (filter as unknown as ContractStatus)
                  )
                  .map((c) => (
                    <tr key={c.id}>
                      <td>{c.tenant}</td>
                      <td>{c.rent}</td>
                      <td>{formatDateDDMMYY(c.startDate)}</td>
                      <td>{c.status}</td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
