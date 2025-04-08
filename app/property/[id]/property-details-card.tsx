import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, DollarSign } from "lucide-react"
import { toCurrency } from "@/lib/utils"

export function PropertyDetailsCard({ property }: { property: Property }) {
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