"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Building2,
  FileText,
  Wrench,
  Table
} from "lucide-react"
import { Card } from "@/components/ui/card"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Property", href: "/property", icon: Building2 },
    { name: "Contract", href: "/contract", icon: FileText },
    { name: "Maintenance", href: "/maintenance", icon: Wrench },
    { name: "Airtable", href: "/airtable", icon: Table },
  ]

  return (
    <Card className="sticky top-0 z-10 rounded-none border-b shadow-sm">
      <div className="flex overflow-x-auto no-scrollbar">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

