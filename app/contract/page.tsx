import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data
const contracts = [
  {
    id: "CTR-2023-001",
    property: "Sunset Apartments, Unit 303",
    tenant: "John Doe",
    status: "Active",
  },
  {
    id: "CTR-2023-002",
    property: "Ocean View Condos, Unit 512",
    tenant: "Jane Smith",
    status: "Active",
  },
  {
    id: "CTR-2022-015",
    property: "Mountain Retreat Cabin",
    tenant: "Robert Johnson",
    status: "Expired",
  },
]

export default function ContractsPage() {
  return (
    <div className="px-6 space-y-6 max-w-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <Button size="sm">New</Button>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{contract.id}</span>
                <Badge
                  variant={
                    contract.status === "Active" ? "default" : "secondary"
                  }
                >
                  {contract.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1">
                <strong>Property:</strong> {contract.property}
              </p>
              <p className="text-sm mb-2">
                <strong>Tenant:</strong> {contract.tenant}
              </p>
              <Link href={`/contract/${contract.id}`} className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
