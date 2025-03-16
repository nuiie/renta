import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "renta",
  description: "minimal rental management system",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialData = await fetchAirtableData()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

async function fetchAirtableData() {
  const [properties, contracts, payments] = await Promise.all([
    getProperties(),
    getContracts({ current: false }),
    getPayments(),
  ])

  const propertiesWithContract = properties.map((property) => {
    const currentContract = contracts
      .filter((c) => c.contractStatus == "Ongoing")
      .find((contract) => contract.propertyAId === property.airtableId)
    return {
      ...property,
      currentContract: currentContract || null,
    }
  })

  return { contracts, payments, properties: propertiesWithContract }
}
