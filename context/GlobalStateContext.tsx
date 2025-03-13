"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AirtableData {
  properties: PropertyWithContract[]
  contracts: Contract[]
  payments: Payment[]
}

interface GlobalState {
  airtableData: AirtableData | null
  loading: boolean
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined)

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [airtableData, setAirtableData] = useState<AirtableData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/airtable")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setAirtableData(data)
      } catch (error) {
        console.error("Failed to fetch airtable data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <GlobalStateContext.Provider value={{ airtableData, loading }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider")
  }
  return context
}
