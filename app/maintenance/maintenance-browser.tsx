"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Filter, Search, ArrowUpDown, Info, Wrench, Package } from "lucide-react"
import { toCurrency } from "@/lib/utils"

// Define the enum locally to avoid issues with global types in client components
enum RepairOrAsset {
  REPAIR = "repair",
  ASSET = "asset",
}

interface MaintenanceBrowserProps {
  maintenanceData: Maintenance[]
}

export default function MaintenanceBrowser({ maintenanceData }: MaintenanceBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "repair" | "asset">("all")
  const [sortBy, setSortBy] = useState<"date" | "cost">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  console.log(maintenanceData)
  // Filter and sort the data
  const filteredData = maintenanceData
    .filter((item) => {
      // Apply search filter
      const searchMatch =
        item.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply type filter
      const typeMatch = filter === "all" || item.repairOrAsset === filter

      return searchMatch && typeMatch
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "date") {
        return sortDirection === "asc"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime()
      } else {
        return sortDirection === "asc" ? a.cost - b.cost : b.cost - a.cost
      }
    })

  // Calculate totals
  const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0)
  const repairCost = filteredData
    .filter((item) => item.repairOrAsset === RepairOrAsset.REPAIR)
    .reduce((sum, item) => sum + item.cost, 0)
  const assetCost = filteredData
    .filter((item) => item.repairOrAsset === RepairOrAsset.ASSET)
    .reduce((sum, item) => sum + item.cost, 0)

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }

  // Toggle sort direction
  const toggleSort = (column: "date" | "cost") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Maintenance & Assets</h1>
        {/* <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add
        </Button> */}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-medium">฿{toCurrency(totalCost)}</p>
            </div>
            <div>
              <p className="text-gray-500">Repairs</p>
              <p className="font-medium">฿{toCurrency(repairCost)}</p>
            </div>
            <div>
              <p className="text-gray-500">Assets</p>
              <p className="font-medium">฿{toCurrency(assetCost)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("repair")}>Repairs Only</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("asset")}>Assets Only</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px] cursor-pointer" onClick={() => toggleSort("date")}>
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="w-[80px] cursor-pointer" onClick={() => toggleSort("cost")}>
                    <div className="flex items-center">
                      Cost
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[40px]">Type</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.airtableId}>
                    <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
                    <TableCell className="truncate max-w-[100px]">{item.nickname}</TableCell>
                    <TableCell>฿{toCurrency(item.cost)}</TableCell>
                    <TableCell>
                      {item.repairOrAsset === RepairOrAsset.REPAIR ? (
                        <Wrench className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Package className="h-4 w-4 text-green-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[320px] rounded-lg">
                          <DialogHeader>
                            <DialogTitle>Maintenance Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="text-gray-500">Date</p>
                              <p>{formatDate(item.date)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Property</p>
                              <p>{item.nickname}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Type</p>
                              <Badge variant={item.repairOrAsset === RepairOrAsset.REPAIR ? "default" : "secondary"}>
                                {item.repairOrAsset === RepairOrAsset.REPAIR ? "Repair" : "Asset"}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-gray-500">Cost</p>
                              <p className="font-medium">฿{toCurrency(item.cost)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Details</p>
                              <p className="whitespace-pre-wrap">{item.details}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
