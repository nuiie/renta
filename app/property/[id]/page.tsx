// import { useGlobalState } from "@/context/GlobalStateContext"
import { getPropertiesWithContract } from "@/lib/airtable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MoreHorizontal,
  Edit,
  Trash,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Home,
} from "lucide-react"
import PropertyCarousel from "./property-carousel"
import ContractList from "./contract-list"

export default async function PropertyDetail({
  params,
}: {
  params: { id: string }
}) {
  // { params }: { params: { id: string } }) {
  // const { properties, loading } = useGlobalState()
  // const property = properties.find((p) => p.id === parseInt(params.id))

  // const property = {
  //   id: "prop_123",
  //   title: "Luxury Apartment in Downtown",
  //   address: "123 Main Street, Downtown, City 12345",
  //   status: "Occupied",
  //   bedrooms: 2,
  //   bathrooms: 2,
  //   price: 1500,
  //   description:
  //     "Modern luxury apartment in the heart of downtown with amazing city views. Features include high ceilings, hardwood floors, and a fully equipped kitchen with stainless steel appliances.",
  //   images: [
  //     "/placeholder.svg?height=600&width=800",
  //     "/placeholder.svg?height=600&width=800",
  //     "/placeholder.svg?height=600&width=800",
  //   ],
  // }

  const property = (await getPropertiesWithContract()).find(
    (p) => p.id === parseInt(params.id)
  )

  // if (loading) {
  //   return <div>loading...</div>
  // }

  if (!property) {
    return <div>property not found</div>
  }

  return (
    <section className="px-6">
      <div className="max-w-md px-6 py-4 space-y-4">
        {/* Header */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight line-clamp-1">
              {property.nickname}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Property
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Viewing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Tenants
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="mr-2 h-4 w-4" />
                  Maintenance History
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Property
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground">{property.address}</p>
        </div>

        {/* Property Carousel */}
        <PropertyCarousel images={property.images.map((i) => i.url)} />

        {/* Rent and Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rental Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    Monthly Rent
                  </p>
                  <p className="text-lg font-bold">${property.maxRent}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Status</p>
                  <Badge
                    variant={property.currentContract ? "default" : "outline"}
                    className="mt-1"
                  >
                    {property.currentContract ? "Occupied" : "Available"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Description */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              {property.description}
            </p>
          </CardContent>
        </Card>

        {/* Contract List */}
        <ContractList contractAIds={property.contract} />
      </div>
      {/* property details {property.nickname}
      <p>header, nickname, button for edit, menu</p>
      <p>Carousel</p>
      <p>property table form</p>
      <p>contract list</p> */}
    </section>
  )
}
