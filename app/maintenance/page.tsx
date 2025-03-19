import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Maintenance() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Maintenance & Assets</h1>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Recent Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="border-l-2 border-blue-500 pl-3 py-1">
            <p className="font-medium">15/6/67</p>
            <p>สีขาวบันได ไฟled กรอบไฟ ฝักบัว 647+294</p>
            <p className="text-gray-500 text-xs mt-1">Cost: ฿941</p>
          </div>

          <div className="border-l-2 border-blue-500 pl-3 py-1">
            <p className="font-medium">25/6/67</p>
            <p>ปูน กระเบื้อง แปรงทาสี ฝารองนั่งชักโครก</p>
            <p className="text-gray-500 text-xs mt-1">Cost: ฿740</p>
          </div>

          <div className="border-l-2 border-blue-500 pl-3 py-1">
            <p className="font-medium">1/7/67</p>
            <p>ฝารองนั่ง ขั้วสายไฟ แผงไฟ สวิตช์ ซ่อมชักโครก</p>
            <p className="text-gray-500 text-xs mt-1">Cost: ฿764</p>
          </div>

          <div className="border-l-2 border-blue-500 pl-3 py-1">
            <p className="font-medium">17/7/67</p>
            <p>สีรองพื้น สีภายใน ตาข่ายนก</p>
            <p className="text-gray-500 text-xs mt-1">Cost: ฿2,705.06</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Assets</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div>
            <Badge>Air Conditioner</Badge>
            <ul className="mt-2 space-y-2">
              <li>
                • ติดแอร์ 9000 btu ชั้นลอย ประกัน 5ปี 10ปี ร้านนิวตรีทอง
                แยกปทุมธานี
              </li>
              <li>
                • ติดแอร์ 12000btu ห้องนอนใหญ่ ประกัน 5ปี 10ปี ร้านนิวตรีทอง
                แยกปทุมธานี
              </li>
              <li>• แอร์ 12600 btu 13000 บาท แอร์ 18000 btu 20000 บาท</li>
            </ul>
          </div>

          <div>
            <Badge>Roof</Badge>
            <ul className="mt-2">
              <li>
                • ซ่อมหลังคารั่ว แปรงทาสี 126 อะคิลิค beger roofcool pu hybrid
                สีขาวหลังคา 758 ซิลิโคนใส แนว 93 สีขาซ้ำ 347 ฝนปูนอีพ็อกซี่ 27
                สกรูไม้ฝา 46+30
              </li>
            </ul>
          </div>

          <div>
            <Badge>Plumbing</Badge>
            <ul className="mt-2">
              <li>• ฝักบัวรั่ว ช่างหนึ่ง 0812521131 เช็ดวาล์วเสีย</li>
              <li>• ล้างแอร์ห้องใหญ่ นิวตรีทอง</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
