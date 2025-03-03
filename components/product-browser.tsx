"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpDown, Filter, Search, ShoppingCart } from "lucide-react"

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample product data
const products = [
  {
    id: 1,
    name: "Leather Backpack",
    category: "Bags",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    sale: false,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    sale: true,
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    sale: false,
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Footwear",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    sale: true,
  },
  {
    id: 5,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    sale: false,
  },
  {
    id: 6,
    name: "Denim Jeans",
    category: "Clothing",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    sale: true,
  },
  {
    id: 7,
    name: "Sunglasses",
    category: "Accessories",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.1,
    sale: false,
  },
  {
    id: 8,
    name: "Water Bottle",
    category: "Accessories",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    sale: false,
  },
]

// Available categories for filtering
const categories = [
  "All",
  "Bags",
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
]

export default function ProductBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOption, setSortOption] = useState("featured")
  const [showSaleOnly, setShowSaleOnly] = useState(false)

  // Filter products based on search, category, price range, and sale status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSale = showSaleOnly ? product.sale : true

    return matchesSearch && matchesCategory && matchesPrice && matchesSale
  })

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // featured - maintain original order
    }
  })

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Shop Products</h1>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only">Filter products</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Narrow down products by category, price, and more.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid gap-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <Label htmlFor={`category-${category}`}>
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <p className="text-xs text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sale-only"
                    checked={showSaleOnly}
                    onCheckedChange={(checked) => setShowSaleOnly(!!checked)}
                  />
                  <Label htmlFor="sale-only">Show sale items only</Label>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All")
                    setPriceRange([0, 200])
                    setShowSaleOnly(false)
                  }}
                >
                  Reset Filters
                </Button>
                <Button
                  onClick={() =>
                    (
                      document.querySelector(
                        "[data-close-sheet]"
                      ) as HTMLElement
                    )?.click()
                  }
                >
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
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
                <DropdownMenuRadioItem value="rating">
                  Highest Rated
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results summary */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
        </p>
        {selectedCategory !== "All" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {selectedCategory}
            <button
              onClick={() => setSelectedCategory("All")}
              className="ml-1 rounded-full hover:bg-muted"
              aria-label="Remove filter"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      {/* Product grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-[120px] w-full object-cover"
              />
              {product.sale && (
                <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">
                  Sale
                </Badge>
              )}
            </div>
            <CardContent className="p-2">
              <div className="space-y-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium">${product.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <span className="text-sm text-yellow-500">★</span>
                  <span className="ml-1 text-xs">{product.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 pt-0">
              <Button className="w-full" size="sm">
                <ShoppingCart className="mr-1 h-3 w-3" />
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-12 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setPriceRange([0, 200])
              setShowSaleOnly(false)
            }}
          >
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  )
}
