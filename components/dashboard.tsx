import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import StackedBarChart from "./stackedBarChart"

export function DashboardProperty() {
  return (
    <>
      <div className="p-8 border border-black">
        <h1>property - 16 total</h1>

        <Accordion type="single" collapsible>
          <AccordionItem value="active">
            <AccordionTrigger>active - 70,000 thb</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>181/26 - 6 months left</li>
                <li>181/27 - 3 months left</li>
                <li>181/28 - 1 year 2 months left</li>
                <li>181/29 - 11 months left</li>
                <li>181/30 - 7 months left</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="inactive">
            <AccordionTrigger>inactive - missing 30,000 thb</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>181/22 - 3 months ago</li>
                <li>181/23 - 3 months ago</li>
                <li>181/24 - 6 months ago</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <StackedBarChart />
    </>
  )
}

export function DashboardRevenue() {
  return <div>revenue chart</div>
}

export function DashboardLatePayments() {
  return <div>late paymetns</div>
}

export function DashboardRecentTransactions() {
  return <div>recent transactions</div>
}
