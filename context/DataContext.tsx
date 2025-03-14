"use client"

import { createContext, useContext, useState } from "react"

interface DataContextType {
  properties: PropertyWithContract[]
  contracts: Contract[]
  payments: Payment[]
}

const DataContext = createContext<DataContextType>({
  properties: [],
  contracts: [],
  payments: [],
})

export function DataProvider({
  initialData,
  children,
}: {
  initialData: {
    properties: PropertyWithContract[]
    contracts: Contract[]
    payments: Payment[]
  }
  children: React.ReactNode
}) {
  const [data] = useState(initialData) // hydrate with server data

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export function useData() {
  return useContext(DataContext)
}
