import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PropertyCarousel from "./property-carousel"
import { getProperty, getContract } from "@/lib/directFetchAirtable"
import Link from "next/link"
import { Suspense } from "react"
import { PaymentDetail, PaymentDetailSkeleton } from "@/components/PaymentDetail"
import { RentalContracts } from "./rental-contract"
import { PropertyDetailsCard } from "./property-details-card"

export default async function PropertyDetail({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  const [properties, contracts] = await Promise.all([
    getProperty(),
    getContract(),
  ])

  // Find the property with the matching ID
  const property = properties.find(p => p.id.toString() === id)

  if (!property) {
    return <div>Property not found</div>
  }

  // Filter contracts for this property
  const propertyContracts = contracts.filter(
    (contract) => contract.propertyAId === property.airtableId
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/property">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">
          {property.nickname} #{property.id}
        </h1>
        <Badge
          variant={property.currentContractId ? "default" : "outline"}
        >
          {property.currentContractId ? "Occupied" : "Vacant"}
        </Badge>
      </div>

      <PropertyCarousel images={property.images.map((i) => i.url)} />
      <PropertyDetailsCard property={property} />
      <RentalContracts contracts={propertyContracts} />
      {property.currentContractId && <Suspense fallback={<PaymentDetailSkeleton />}>
        <PaymentDetail contractId={property.currentContractId?.toString() || '0'} />
      </Suspense>}
    </div>
  )
}
