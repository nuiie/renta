"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/property", label: "Property" },
  { href: "/contract", label: "Contract" },
  { href: "/payment", label: "Payment" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/asset", label: "Asset" },
  {
    href: "https://airtable.com/appBNQZ6kc8ziiDRA/tbloob8vM0OlPcDTD/viweonP8cvRsaDmRB",
    label: "Airtable",
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="m-6">
      <ul className="flex flex-wrap">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "bg-black text-white px-2" : "px-2"}
              target={item.label == "Airtable" ? "_blank" : ""}
            >
              {item.label}
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
