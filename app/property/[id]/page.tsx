import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, DollarSign, Calendar } from "lucide-react"

export default function PropertyDetail({ params }: { params: { id: string } }) {
  // This would be fetched from your API in a real app
  const property = {
    id: params.id,
    name: params.id === "71/45" ? "พฤกษา หลังเล็ก" : "Property",
    address: "71/45 ซอย พฤกษา 71 ซ.ไร่ขิงค่า อ.สามพราน จ.นครปฐม",
    zipcode: "12000",
    rent: "฿5,000",
    status: "Occupied",
    contracts: [
      {
        tenant: "นาย พลเทพ สาวิทย์",
        status: "Ongoing",
        period: "01/05/2024 - 30/04/2025",
        monthlyRent: "฿5000",
      },
      {
        tenant: "นาย พลเทพ สาวิทย์",
        status: "Expired",
        period: "01/05/2023 - 30/04/2024",
        monthlyRent: "฿5000",
      },
    ],
    payments: [
      {
        due: "01/05/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "13/05/2024",
      },
      {
        due: "01/06/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "16/06/2024",
      },
      {
        due: "01/07/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "13/07/2024",
      },
      {
        due: "01/08/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "04/08/2024",
      },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {property.id} {property.name}
        </h1>
      </div>

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
              <span>Monthly Rent</span>
              <span className="font-medium">{property.rent}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={property.status === "Occupied" ? "default" : "outline"}
            >
              {property.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Rental Contracts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {property.contracts.map((contract, i) => (
              <div key={i} className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{contract.tenant}</p>
                  <Badge
                    variant={
                      contract.status === "Ongoing" ? "default" : "outline"
                    }
                  >
                    {contract.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Period</span>
                  </div>
                  <p>{contract.period}</p>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Monthly Rent</span>
                  </div>
                  <p>{contract.monthlyRent}</p>
                </div>
                <Button variant="link" size="sm" className="px-0 h-auto mt-1">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {property.payments.map((payment, i) => (
              <div key={i} className="p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    Due: <span className="font-medium">{payment.due}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.status === "Paid"
                      ? `Paid: ${payment.paidDate}`
                      : "Not paid"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <Badge
                    variant={
                      payment.status === "Paid" ? "success" : "destructive"
                    }
                    className="text-xs"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
