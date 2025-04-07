import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyBrowserSkeleton() {
    return (
        <div className="container mx-auto max-w-md px-4 py-6">
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-full md:w-64" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-48" />
                </div>
            </div>

            <div className="mt-6">
                <Skeleton className="h-5 w-32" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-[120px] w-full" />
                        <CardContent className="p-2">
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-5 w-1/2" />
                        </CardContent>
                        <div className="p-2 pt-0">
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}