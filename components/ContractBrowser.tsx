"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { useData } from "@/context/DataContext"

export default function ContractBrowser() {
  const { contracts } = useData()
  const [showOngoingOnly, setShowOngoingOnly] = useState(false)
  const filteredContracts = contracts.filter((contract) => {
    return showOngoingOnly ? contract.contractStatus == "Ongoing" : true
  })

  return (
    <div className="px-6 space-y-6 max-w-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <Button size="sm">New</Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available-only"
            checked={showOngoingOnly}
            onCheckedChange={(checked) => setShowOngoingOnly(!!checked)}
          />
          <Label htmlFor="available-only">Show ongoing contracts only</Label>
        </div>
        {filteredContracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{contract.id}</span>
                <Badge
                  variant={
                    contract.contractStatus === "Ongoing"
                      ? "default"
                      : "secondary"
                  }
                >
                  {contract.contractStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1">
                <strong>Property:</strong> {contract.nickname}
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
