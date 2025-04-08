import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  Home,
  User,
} from "lucide-react"
import { getContract } from "@/lib/directFetchAirtable"
import { formatDateDDMMYY, toCurrency } from "@/lib/utils"
import { PaymentDetail } from "@/components/PaymentDetail"

export default async function ContractDetail({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const contracts = (await getContract({ current: false })).filter((c: Contract) => c.id === parseInt(id))

  if (contracts.length === 0) {
    return <div>Contract not found</div>
  }

  const contract = contracts[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/contract">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Contract #{id}</h1>
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Contract Details
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Home className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">
                  {contract.nickname}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">{contract.tenant}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Contract Period</p>
                <p className="text-gray-500 text-xs">
                  {formatDateDDMMYY(contract.startDate)} - {formatDateDDMMYY(contract.endDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="font-medium mb-2">Contract Terms</p>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-gray-500">Monthly Rent</p>
              <p className="text-right font-mono">{toCurrency(contract.rent)}</p>

              <p className="text-gray-500">Common Fee</p>
              <p className="text-right font-mono">{toCurrency(contract.commonFee || 0)}</p>

              <p className="text-gray-500">Tax 5%</p>
              <p className="text-right font-mono">{contract.tax ? `฿${toCurrency(contract.rent * 5 / 100)}` : "฿0"}</p>

              <p className="text-gray-500">Total</p>
              <p className="text-right font-mono">{toCurrency(contract.rent + (contract.commonFee || 0) + (contract.tax ? contract.rent * 5 / 100 : 0))}</p>

              <p className="text-gray-500">Duration</p>
              <p className="text-right font-mono">{contract.duration} months</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <PaymentDetail contractId={id} />
    </div>
  )
}
