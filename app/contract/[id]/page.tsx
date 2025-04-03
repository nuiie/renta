import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Home,
  User,
  AlertTriangle,
  Printer,
  Download,
  Mail,
} from "lucide-react"

export default async function ContractDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // This would be fetched from your API in a real app
  const contract = {
    id: id,
    property: {
      id: "71/45",
      name: "พฤกษา หลังเล็ก",
      address: "71/45 ซอย พฤกษา 71 ซ.ไร่ขิงค่า อ.สามพราน จ.นครปฐม",
      zipcode: "12000",
    },
    tenant: {
      name: "นาย พลเทพ สาวิทย์",
      phone: "081-234-5678",
      email: "phon@example.com",
      idCard: "1234567890123",
    },
    status: id === "4" ? "Ongoing" : "Expired",
    period: {
      start: "01/05/2024",
      end: "30/04/2025",
    },
    terms: {
      monthlyRent: "฿5,000.00",
      deposit: "฿10,000.00",
      paymentDue: "1st of each month",
      lateFeesPerDay: "฿100.00",
    },
    payments: [
      {
        id: "P2024050101",
        period: "May 2024",
        dueDate: "01/05/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "13/05/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X249",
      },
      {
        id: "P2024060101",
        period: "Jun 2024",
        dueDate: "01/06/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "16/06/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X967",
      },
      {
        id: "P2024070101",
        period: "Jul 2024",
        dueDate: "01/07/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "13/07/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X822",
      },
      {
        id: "P2024080101",
        period: "Aug 2024",
        dueDate: "01/08/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "04/08/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "BBL",
      },
      {
        id: "P2024090101",
        period: "Sep 2024",
        dueDate: "01/09/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "11/09/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X591",
      },
      {
        id: "P2024100101",
        period: "Oct 2024",
        dueDate: "01/10/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "13/10/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X822",
      },
      {
        id: "P2024110101",
        period: "Nov 2024",
        dueDate: "01/11/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "18/11/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X967",
      },
      {
        id: "P2024120101",
        period: "Dec 2024",
        dueDate: "01/12/2024",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "15/12/2024",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X249",
      },
      {
        id: "P2025010101",
        period: "Jan 2025",
        dueDate: "01/01/2025",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "17/01/2025",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X591",
      },
      {
        id: "P2025020101",
        period: "Feb 2025",
        dueDate: "01/02/2025",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "15/02/2025",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X967",
      },
      {
        id: "P2025030101",
        period: "Mar 2025",
        dueDate: "01/03/2025",
        amount: "฿5,440.00",
        status: "Paid",
        paidDate: "14/03/2025",
        paidAmount: "฿5,440.00",
        method: "Bank Transfer",
        reference: "X822",
      },
      {
        id: "P2025040101",
        period: "Apr 2025",
        dueDate: "01/04/2025",
        amount: "฿5,440.00",
        status: "Not Due",
        paidDate: "",
        paidAmount: "",
        method: "",
        reference: "",
      },
    ],
    statistics: {
      totalDue: "฿65,280.00",
      totalPaid: "฿59,840.00",
      remaining: "฿5,440.00",
      onTimePayments: 8,
      latePayments: 3,
      averageDaysLate: 12,
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/contracts">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Contract #{id}</h1>
        <Badge
          variant={
            contract.status === "Ongoing"
              ? "default"
              : contract.status === "Expired"
              ? "secondary"
              : "outline"
          }
        >
          {contract.status}
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
                  {contract.property.id} {contract.property.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {contract.property.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">{contract.tenant.name}</p>
                <p className="text-gray-500 text-xs">
                  {contract.tenant.phone} • {contract.tenant.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Contract Period</p>
                <p className="text-gray-500 text-xs">
                  {contract.period.start} - {contract.period.end}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="font-medium mb-2">Contract Terms</p>
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <p className="text-gray-500">Monthly Rent</p>
              <p>{contract.terms.monthlyRent}</p>

              <p className="text-gray-500">Deposit</p>
              <p>{contract.terms.deposit}</p>

              <p className="text-gray-500">Payment Due</p>
              <p>{contract.terms.paymentDue}</p>

              <p className="text-gray-500">Late Fees</p>
              <p>{contract.terms.lateFeesPerDay}/day</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 gap-1 flex-1"
            >
              <Printer className="h-3 w-3" /> Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 gap-1 flex-1"
            >
              <Download className="h-3 w-3" /> Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 gap-1 flex-1"
            >
              <Mail className="h-3 w-3" /> Email
            </Button>
          </div>
        </CardContent>
      </Card>

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
              {contract.statistics.totalDue}
            </p>

            <p className="text-gray-500">Total Paid</p>
            <p className="text-right">{contract.statistics.totalPaid}</p>

            <p className="text-gray-500">Remaining</p>
            <p className="text-right">{contract.statistics.remaining}</p>

            <p className="text-gray-500">On-time Payments</p>
            <p className="text-right">
              {contract.statistics.onTimePayments} of{" "}
              {contract.payments.length - 1}
            </p>

            <p className="text-gray-500">Late Payments</p>
            <p className="text-right">
              {contract.statistics.latePayments} of{" "}
              {contract.payments.length - 1}
            </p>

            <p className="text-gray-500">Avg. Days Late</p>
            <p className="text-right">
              {contract.statistics.averageDaysLate} days
            </p>
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
              {contract.payments.map((payment, i) => (
                <details key={i} className="group">
                  <summary className="grid grid-cols-12 gap-x-1 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 list-none">
                    <div className="col-span-3 font-medium">
                      {payment.period}
                    </div>
                    <div className="col-span-3">{payment.dueDate}</div>
                    <div className="col-span-3 text-right">
                      {payment.amount}
                    </div>
                    <div className="col-span-3 text-right">
                      <Badge
                        variant={
                          payment.status === "Paid"
                            ? "default"
                            : payment.status === "Not Due"
                            ? "outline"
                            : "destructive"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </summary>

                  {/* Expanded details */}
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs">
                    {payment.status === "Paid" ? (
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                        <p className="text-gray-500">Paid Date</p>
                        <p>{payment.paidDate}</p>

                        <p className="text-gray-500">Paid Amount</p>
                        <p>{payment.paidAmount}</p>

                        <p className="text-gray-500">Method</p>
                        <p>{payment.method}</p>

                        <p className="text-gray-500">Reference</p>
                        <p>{payment.reference}</p>
                      </div>
                    ) : payment.status === "Not Due" ? (
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
    </div>
  )
}
