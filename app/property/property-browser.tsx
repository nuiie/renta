"use client"

import { useState } from "react"
import { ArrowUpDown, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toCurrency } from "@/lib/utils"

export function PropertyBrowser({
  initialProperties,
}: {
  initialProperties: Property[]
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortOption, setSortOption] = useState("featured")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  // Filter properties based on search, price range, and available status
  const filteredProperties = initialProperties.filter((property) => {
    // If search query is empty, consider it a match
    const matchesSearch = !searchQuery || (property.nickname &&
      property.nickname.toLowerCase().includes(searchQuery.toLowerCase()))

    // If maxRent is undefined or null, consider it a match
    const matchesPrice = !property.maxRent || (
      property.maxRent >= priceRange[0] &&
      property.maxRent <= priceRange[1]
    )

    const matchesAvailable = !showAvailableOnly || !property.currentContractId
    return matchesSearch && matchesPrice && matchesAvailable
  })


  // Sort properties based on selected option
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (a.maxRent || 0) - (b.maxRent || 0)
      case "price-high":
        return (b.maxRent || 0) - (a.maxRent || 0)
      default:
        return 0 // featured - maintain original order
    }
  })

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Properties</h1>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Property..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <ArrowUpDown className="mr-1 h-3.5 w-3.5" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={setSortOption}
              >
                <DropdownMenuRadioItem value="featured">
                  Featured
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-low">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-high">
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available-only"
            checked={showAvailableOnly}
            onCheckedChange={(checked) => setShowAvailableOnly(!!checked)}
          />
          <Label htmlFor="available-only">Show available properties only</Label>
        </div>
      </div>

      {/* Results summary */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedProperties.length} of {initialProperties.length} properties
        </p>
      </div>

      {/* Property grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {sortedProperties.map((property, index) => (
          <Card
            key={property.id || `property-${index}`}
            className="overflow-hidden flex flex-col justify-between"
          >
            <div className="relative">
              <Image
                src={property.images?.[0]?.url ?? "/placeholder.svg"}
                alt={property.nickname}
                width={300}
                height={300}
                className="h-[120px] w-full object-cover"
              />
              {!property.currentContractId && (
                <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">
                  Available
                </Badge>
              )}
            </div>
            <CardContent className="p-2 flex-grow">
              <div className="space-y-1">
                <h3 className="font-semibold">{property.nickname || `Property ${property.id || ''}`}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {property.currentContractId
                    ? `Contract ID: ${property.currentContractId}`
                    : "Available for rent"}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium">
                  {toCurrency(property.maxRent || 0)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-2 pt-0">
              <Link href={`/property/${property.id}`} className="w-full">
                <Button className="w-full" size="sm">
                  Detail
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {sortedProperties.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-12 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="text-lg font-medium">No properties found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setPriceRange([0, 1000000])
              setShowAvailableOnly(false)
            }}
          >
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  )
}


export function PropertyBrowserSkeleton() {
  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-full md:w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-[120px] w-full" />
            <CardContent className="p-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </CardContent>
            <div className="p-2 pt-0">
              <Skeleton className="h-8 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}