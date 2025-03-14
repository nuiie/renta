"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronRight } from "lucide-react"
// import { getContracts } from "@/lib/airtable"
import { useData } from "@/context/DataContext"
import { formatDateDDMMYY } from "@/lib/utils"
import Link from "next/link"

export default function ContractList({
  contractAIds,
}: {
  contractAIds: string[] | null
}) {
  const contracts = useData()
    .contracts.filter((c) => contractAIds?.includes(c.airtableId))
    .sort((a, b) => b.endDate - a.endDate)
  // const contracts = (
  //   await getContracts({
  //     current: false,
  //   })
  // )
  //   .filter((c) => contractAIds?.includes(c.airtableId))
  //   .sort((a, b) => b.endDate - a.endDate)

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
                  <p className="font-medium">{contract.tenant}</p>
                  <Badge
                    variant={
                      contract.contractStatus == "Ongoing"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {contract.contractStatus}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p>
                      {formatDateDDMMYY(contract.startDate)} -{" "}
                      {formatDateDDMMYY(contract.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Monthly Rent
                    </p>
                    <p>${contract.rent}</p>
                  </div>
                </div>

                <Link href={`/contract/${contract.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
