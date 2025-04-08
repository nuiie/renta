import { getMaintenance } from "@/lib/directFetchAirtable"
import MaintenanceBrowser from "./maintenance-browser"

export default async function MaintenancePage() {
  const maintenanceData = await getMaintenance()

  return <MaintenanceBrowser maintenanceData={maintenanceData} />
}
