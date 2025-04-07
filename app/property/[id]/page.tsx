import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, DollarSign, Calendar } from "lucide-react"
import PropertyCarousel from "./property-carousel"
import { getProperty, getContract } from "@/lib/directFetchAirtable"
import { formatDateDDMMYY, toCurrency } from "@/lib/utils"
import Link from "next/link"
import { Suspense } from "react"
import PaymentDetail from "@/components/PaymentDetail"

// Define the Contract type
interface Contract {
  id: number
  propertyAId: string
  nickname: string
  tenant: string
  contractStatus: string
  startDate: Date
  duration: number
  endDate: Date
  rent: number
  commonFee: number
  tax: boolean
  paymentAId: string[]
  airtableId: string
}

function PropertyDetailsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div className="flex items-start gap-2">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex justify-between w-full">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

function RentalContractsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Rental Contracts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {[1, 2].map((i) => (
            <div key={i} className="p-3">
              <div className="flex justify-between items-start mb-1">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentHistorySkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Payment History
        </CardTitle>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-xs">
          <div className="grid grid-cols-12 gap-x-1 px-3 py-2 font-medium bg-gray-50 dark:bg-gray-800">
            <div className="col-span-3">Period</div>
            <div className="col-span-3">Due Date</div>
            <div className="col-span-3 text-right">Amount</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          <div className="divide-y max-h-[400px] overflow-y-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="grid grid-cols-12 gap-x-1 px-3 py-2">
                  <div className="col-span-3">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="col-span-3">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="col-span-3 text-right">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                  </div>
                  <div className="col-span-3 text-right">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PropertyDetailsCard({ property }: { property: Property }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div className="flex items-start gap-2">
          <Home className="h-4 w-4 text-gray-500 mt-0.5" />
          <p>{property.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <div className="flex justify-between w-full">
            <span>Max Rent</span>
            <span className="font-medium">{toCurrency(property.maxRent)}</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

function RentalContracts({ contracts }: { contracts: Contract[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Rental Contracts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {contracts.sort((a, b) => b.startDate.getTime() - a.startDate.getTime()).map((contract, i) => (
            <div key={i} className="p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium">{contract.tenant}</p>
                <Badge
                  variant={
                    contract.contractStatus === "Ongoing" ? "default" : "outline"
                  }
                >
                  {contract.contractStatus}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Period</span>
                </div>
                <p>{formatDateDDMMYY(contract.startDate)} - {formatDateDDMMYY(contract.endDate)}</p>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>Monthly Rent</span>
                </div>
                <p>{toCurrency(contract.rent)}</p>
              </div>
              <Link href={`/contract/${contract.id}`}>
                <Button variant="link" size="sm" className="px-0 h-auto mt-1">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PropertyDetail({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

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
      <div className="flex items-center justify-between">
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

      <Suspense fallback={<PropertyDetailsSkeleton />}>
        <PropertyDetailsCard property={property} />
      </Suspense>

      <Suspense fallback={<RentalContractsSkeleton />}>
        <RentalContracts contracts={propertyContracts} />
      </Suspense>

      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentDetail propertyId={property.id} />
      </Suspense>
    </div>
  )
}

