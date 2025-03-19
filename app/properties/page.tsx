import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, SortDesc } from "lucide-react"

export default function Properties() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Properties</h1>
        <p className="text-sm text-gray-500">17 total</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search properties..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <SortDesc className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="available" />
        <label htmlFor="available" className="text-sm">
          Show available properties only
        </label>
      </div>

      <div className="space-y-3">
        {[
          {
            id: "71/45",
            name: "พฤกษา หลังเล็ก",
            rent: "฿5,000.00",
            contractId: 25,
          },
          {
            id: "71/46",
            name: "พฤกษา มุมซ้ายหน้าออก",
            rent: "฿7,750.00",
            contractId: 28,
          },
          {
            id: "71/47",
            name: "พฤกษา สนามเด็กเล่น",
            rent: "฿8,000.00",
            contractId: 36,
          },
          {
            id: "71/51",
            name: "พฤกษา พันธุ์ไม้",
            rent: "฿6,500.00",
            contractId: 4,
          },
        ].map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {property.id} {property.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      contract id: {property.contractId}
                    </p>
                  </div>
                  <p className="font-medium">{property.rent}</p>
                </div>
              </div>
              <Link
                href={`/properties/${property.id}`}
                className="block w-full bg-gray-900 text-white text-center p-2 text-sm hover:bg-gray-800 transition-colors"
              >
                Detail
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
