import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, DollarSign, Calendar, Construction, AlertTriangle } from "lucide-react"
import PropertyCarousel from "./property-carousel"
import { getProperties, getContracts, getPayments } from "@/lib/airtable"
import { formatDateDDMMYY, toCurrency } from "@/lib/utils"
import Link from "next/link"
import { Suspense } from "react"

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

function PropertyDetails({ property }: { property: Property }) {
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

function RentalContracts({ property, contracts }: { property: Property, contracts: Contract[] }) {
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
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = (await getProperties()).find((p) => p.id === parseInt(id))

  if (!property) {
    return <div>property not found</div>
  }
  const contracts = (await getContracts({ current: false })).filter((c) => property.contract.includes(c.airtableId))

  let currentContract: Contract | undefined = undefined

  if (property.currentContractId) {
    currentContract = contracts.find((c) => c.id === property.currentContractId)
  }

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
        <PropertyDetails property={property} />
      </Suspense>

      <Suspense fallback={<RentalContractsSkeleton />}>
        <RentalContracts property={property} contracts={contracts} />
      </Suspense>

      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentDetail contract={currentContract} />
      </Suspense>
    </div>
  )
}

async function PaymentDetail({ contract }: { contract: Contract | undefined }) {
  if (!contract) {
    return null
  }

  const payments = await getPayments({ contractId: contract.id })

  const totalDue = payments.reduce((acc, payment) => acc + payment.amountToBePaid, 0)
  const totalPaid = payments.filter(p => p.paymentStatus === "Paid").reduce((acc, payment) => acc + payment.paidAmount, 0)
  const remaining = totalDue - totalPaid

  // Calculate on-time and late payments with 5-day grace period
  const { onTimePayments, latePayments, totalDaysLate } = payments.reduce((acc, payment) => {
    if (payment.paymentStatus === "Paid" && payment.paidDate) {
      const daysLate = Math.max(0, Math.ceil((payment.paidDate.getTime() - payment.due.getTime()) / (1000 * 60 * 60 * 24)))
      if (daysLate <= 5) {
        acc.onTimePayments++
      } else {
        acc.latePayments++
        acc.totalDaysLate += daysLate
      }
    } else if (payment.paymentStatus === "Overdue") {
      acc.latePayments++
    }
    return acc
  }, { onTimePayments: 0, latePayments: 0, totalDaysLate: 0 })

  const avgDaysLate = latePayments > 0 ? Math.round(totalDaysLate / latePayments) : 0

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-gray-500">Total Due</p>
            <p className="text-right font-medium">
              {toCurrency(totalDue)}
            </p>

            <p className="text-gray-500">Total Paid</p>
            <p className="text-right">{toCurrency(totalPaid)}</p>

            <p className="text-gray-500">Remaining</p>
            <p className="text-right">{toCurrency(remaining)}</p>

            <p className="text-gray-500">On-time Payments</p>
            <p className="text-right">
              {onTimePayments} of {payments.length}
            </p>

            <p className="text-gray-500">Late Payments</p>
            <p className="text-right">
              {latePayments} of {payments.length}
            </p>

            {latePayments > 0 && (
              <>
                <p className="text-gray-500">Avg. Days Late</p>
                <p className="text-right">
                  {avgDaysLate} days
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Payment History
          </CardTitle>
          <Button size="sm" className="gap-1 h-8">
            <DollarSign className="h-4 w-4" /> Record
          </Button>
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
              {payments.sort(p => p.paymentNumber).map((payment, i) => (
                <details key={i} className="group">
                  <summary className="grid grid-cols-12 gap-x-1 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 list-none">
                    <div className="col-span-3 font-medium">
                      #{payment.paymentNumber} {payment.paymentType}
                    </div>
                    <div className="col-span-3">{formatDateDDMMYY(payment.due)}</div>
                    <div className="col-span-3 text-right">
                      {toCurrency(payment.amountToBePaid)}
                    </div>
                    <div className="col-span-3 text-right">
                      <Badge
                        variant={
                          payment.paymentStatus === "Paid"
                            ? "default"
                            : payment.paymentStatus === "Not Due"
                              ? "outline"
                              : "destructive"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {payment.paymentStatus}
                      </Badge>
                    </div>
                  </summary>

                  {/* Expanded details */}
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs">
                    {payment.paymentStatus === "Paid" ? (
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                        <p className="text-gray-500">Paid Date</p>
                        <p>{payment.paidDate ? formatDateDDMMYY(payment.paidDate) : ""}</p>

                        <p className="text-gray-500">Paid Amount</p>
                        <p>{toCurrency(payment.paidAmount)}</p>

                        <p className="text-gray-500">Bank</p>
                        <p>{payment.bank || ""}</p>

                        <p className="text-gray-500">Note</p>
                        <p>{payment.desc || ""}</p>
                      </div>
                    ) : payment.paymentStatus === "Not Due" ? (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                        >
                          <DollarSign className="h-3 w-3 mr-1" /> Pay Now
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-500">
                        <AlertTriangle className="h-3 w-3" />
                        <p>Payment is overdue</p>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}