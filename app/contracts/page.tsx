import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Contracts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Contracts</h1>
        <div className="space-x-2">
          <Button size="sm" className="gap-1" variant="outline">
            <Plus className="h-4 w-4" /> New Contract
          </Button>
          <DialogDemo />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="ongoing" />
        <label htmlFor="ongoing" className="text-sm">
          Show ongoing contracts only
        </label>
      </div>

      <div className="space-y-3">
        {[
          {
            id: 1,
            property: "10/1 อยธยา",
            tenant: "ไม่ทราบชื่อ",
            status: "Terminated",
          },
          {
            id: 4,
            property: "71/51 พฤกษา พันธุ์ไม้",
            tenant: "นาย ณัฐพล คำสุทธะ",
            status: "Ongoing",
          },
          {
            id: 5,
            property: "98 บ้านสินเจริญ",
            tenant: "บจก. มิตรจินดา",
            status: "Expired",
          },
          {
            id: 6,
            property: "98 บ้านสินเจริญ",
            tenant: "บจก. มิตรจินดา",
            status: "Expired",
          },
        ].map((contract) => (
          <Card key={contract.id}>
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm">{contract.id}</p>
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
              <div className="space-y-1 mb-2">
                <p className="text-sm">
                  <span className="text-gray-500">Property:</span>{" "}
                  {contract.property}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Tenant:</span>{" "}
                  {contract.tenant}
                </p>
              </div>
              <Link href={`/contracts/${contract.id}`}>
                <Button variant="link" size="sm" className="px-0 h-auto">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> New Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&#39;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
