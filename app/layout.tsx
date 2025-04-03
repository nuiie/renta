import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Renta - Property Management",
  description: "Mobile property rental management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="mx-auto max-w-md min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 p-4">{children}</main>
            <footer className="text-xs text-center p-2 text-gray-500 border-t">
              Last updated: {new Date().toLocaleDateString("th-TH")}
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
