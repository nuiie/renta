"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/", label: "dashboard" },
  { href: "/property", label: "property" },
  { href: "/contract", label: "contract" },
  { href: "/maintenance", label: "maintenance & assets" },
  {
    href: "https://airtable.com/appBNQZ6kc8ziiDRA/tbloob8vM0OlPcDTD/viweonP8cvRsaDmRB",
    label: "airtable",
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
              prefetch={false}
              key={item.href}
              href={item.href}
              className={isActive ? "bg-black text-white px-2" : "px-2"}
              target={item.label == "airtable" ? "_blank" : ""}
            >
              {item.label}
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
