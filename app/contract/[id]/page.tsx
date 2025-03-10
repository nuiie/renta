import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, CalendarIcon, DollarSign, Clock } from "lucide-react"

export default function ContractPage({ params }: { params: { id: string } }) {
  const contractId = params.id

  return (
    <div className="px-6 space-y-6 max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/contracts">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Contract {contractId}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Property:</strong> Sunset Apartments, Unit 303
          </p>
          <p>
            <strong>Address:</strong> 123 Main Street, Anytown, CA 90210
          </p>
          <p>
            <strong>Type:</strong> Apartment
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tenant Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contract Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p>
                <strong>Start:</strong> Jan 1, 2023
              </p>
              <p>
                <strong>End:</strong> Dec 31, 2023
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p>
                <strong>Rent:</strong> $1,500/month
              </p>
              <p>
                <strong>Deposit:</strong> $1,500
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p>
                <strong>Due:</strong> 1st of month
              </p>
              <p>
                <strong>Late Fee:</strong> $50 after 5 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              date: "Jan 1, 2023",
              amount: 1500,
              status: "Paid",
              paidDate: "Jan 1, 2023",
            },
            {
              date: "Feb 1, 2023",
              amount: 1500,
              status: "Paid",
              paidDate: "Feb 1, 2023",
            },
            {
              date: "Mar 1, 2023",
              amount: 1500,
              status: "Paid",
              paidDate: "Mar 1, 2023",
            },
          ].map((payment, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p>
                  <strong>Due:</strong> {payment.date}
                </p>
                <p>
                  <strong>Amount:</strong> ${payment.amount}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={payment.status === "Paid" ? "default" : "secondary"}
                >
                  {payment.status}
                </Badge>
                <p className="text-xs mt-1">{payment.paidDate}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button className="flex-1">Edit Contract</Button>
        <Button variant="outline" className="flex-1">
          Print
        </Button>
      </div>
    </div>
  )
}
