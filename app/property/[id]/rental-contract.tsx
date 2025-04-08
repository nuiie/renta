import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateDDMMYY, toCurrency } from "@/lib/utils"
import { Calendar, ChevronRight, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RentalContracts({ contracts }: { contracts: Contract[] }) {
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