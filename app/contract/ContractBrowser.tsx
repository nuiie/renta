"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import PaymentModal from "@/components/payment-modal"
import { Suspense } from "react"
import { ChevronRight, Loader2, Plus } from "lucide-react"

export default function ContractBrowser({
  contracts,
}: {
  contracts: Contract[]
}) {
  const [showOngoingOnly, setShowOngoingOnly] = useState(false)
  const filteredContracts = contracts.filter((contract) => {
    return showOngoingOnly ? contract.contractStatus == "Ongoing" : true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Contracts</h1>
        <div className="space-x-2">
          {/* <Button size="sm" className="gap-1" variant="outline">
            <Plus className="h-4 w-4" /> New Contract
          </Button> */}
          <Suspense
            fallback={
              <Button size="sm" className="gap-1" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Record Payment
              </Button>
            }
          >
            <PaymentModal />
          </Suspense>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="available-only"
          checked={showOngoingOnly}
          onCheckedChange={(checked) => setShowOngoingOnly(!!checked)}
        />
        <label htmlFor="ongoing" className="text-sm">
          Show ongoing contracts only
        </label>
      </div>

      <div className="space-y-3">
        {filteredContracts.map((contract) => (
          <Card key={contract.id}>
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm">{contract.id}</p>
                <Badge
                  variant={
                    contract.contractStatus === "Ongoing"
                      ? "default"
                      : contract.contractStatus === "Expired"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {contract.contractStatus}
                </Badge>
              </div>
              <div className="space-y-1 mb-2">
                <p className="text-sm">
                  <span className="text-gray-500">Property:</span>{" "}
                  {contract.nickname}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Tenant:</span>{" "}
                  {contract.tenant}
                </p>
              </div>
              <Link href={`/contract/${contract.id}`}>
                <Button variant="link" size="sm" className="px-0 h-auto">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
