"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronRight } from "lucide-react"

export default function ContractList() {
  // In a real app, you would fetch this data from your API
  const contracts = [
    {
      id: "contract_1",
      tenantName: "John Doe",
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      monthlyRent: 1500,
      status: "Active",
      paymentStatus: "Paid",
      lastPaymentDate: "2023-06-01",
    },
    {
      id: "contract_2",
      tenantName: "Jane Smith",
      startDate: "2022-01-01",
      endDate: "2023-01-01",
      monthlyRent: 1400,
      status: "Expired",
      paymentStatus: "Completed",
      lastPaymentDate: "2023-01-01",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Rental Contracts</CardTitle>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>
      </CardHeader>

      {contracts.length === 0 ? (
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-sm font-medium">No contracts found</p>
            <p className="text-xs text-muted-foreground mb-4">
              This property doesn&apos;t have any contracts yet.
            </p>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-0">
          <div className="divide-y">
            {contracts.map((contract) => (
              <div key={contract.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{contract.tenantName}</p>
                  <Badge
                    variant={
                      contract.status === "Active" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {contract.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p>
                      {new Date(contract.startDate).toLocaleDateString()} -{" "}
                      {new Date(contract.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Monthly Rent
                    </p>
                    <p>${contract.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Payment Status
                    </p>
                    <p>{contract.paymentStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Payment
                    </p>
                    <p>
                      {new Date(contract.lastPaymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
