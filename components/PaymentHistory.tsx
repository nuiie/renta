import { formatDateDDMMYY, toCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

export default function PaymentHistory({ payments }: { payments: Payment[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p>
                <strong>Due:</strong> {formatDateDDMMYY(payment.due)}
              </p>
              <p>
                <strong>Amount:</strong> {toCurrency(payment.amountToBePaid)}
              </p>
            </div>
            <div className="text-right">
              <Badge
                variant={
                  payment.paymentStatus === "Paid"
                    ? "default"
                    : payment.paymentStatus === "Overdue"
                    ? "destructive"
                    : "secondary"
                }
              >
                {payment.paymentStatus}
              </Badge>
              <p className="text-xs mt-1">
                {!!payment.paidDate && formatDateDDMMYY(payment.paidDate)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
