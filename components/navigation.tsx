"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Property", href: "/property" },
    { name: "Contract", href: "/contract" },
    { name: "Maintenance", href: "/maintenance" },
    { name: "Airtable", href: "/airtable" },
  ]

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
      <div className="flex overflow-x-auto no-scrollbar">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-3 text-sm whitespace-nowrap transition-colors",
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
