"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface GlobalState {
  properties: PropertyWithContract[]
  loading: boolean
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined)

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [properties, setProperties] = useState<PropertyWithContract[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/properties")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <GlobalStateContext.Provider value={{ properties, loading }}>
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
