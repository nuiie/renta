import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MaintenanceLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Maintenance & Assets</h1>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-gray-500">Total</p>
              <Skeleton className="h-5 w-20" />
            </div>
            <div>
              <p className="text-gray-500">Repairs</p>
              <Skeleton className="h-5 w-20" />
            </div>
            <div>
              <p className="text-gray-500">Assets</p>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">Date</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="w-[80px]">Cost</TableHead>
                  <TableHead className="w-[40px]">Type</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-4 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
