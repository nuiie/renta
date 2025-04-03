"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"

// Mock data for demonstration
const contractData = [
  { tenantId: "1", tenantName: "John Doe", houseNumber: "A101", amount: 1200 },
  {
    tenantId: "2",
    tenantName: "Jane Smith",
    houseNumber: "B202",
    amount: 1500,
  },
  {
    tenantId: "3",
    tenantName: "Robert Johnson",
    houseNumber: "C303",
    amount: 1800,
  },
  {
    tenantId: "4",
    tenantName: "Emily Davis",
    houseNumber: "D404",
    amount: 2000,
  },
]

export default function PaymentFormDialog() {
  const [open, setOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState("")
  const [selectedHouse, setSelectedHouse] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Effect to handle mutual exclusivity between tenant and house selection
  useEffect(() => {
    if (selectedTenant) {
      const contract = contractData.find((c) => c.tenantId === selectedTenant)
      if (contract) {
        setSelectedHouse(contract.houseNumber)
        setPaymentAmount(contract.amount.toString())
      }
    }
  }, [selectedTenant])

  useEffect(() => {
    if (selectedHouse) {
      const contract = contractData.find((c) => c.houseNumber === selectedHouse)
      if (contract) {
        setSelectedTenant(contract.tenantId)
        setPaymentAmount(contract.amount.toString())
      }
    }
  }, [selectedHouse])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Process payment submission logic here
      console.log({
        tenant: selectedTenant,
        house: selectedHouse,
        amount: paymentAmount,
        method: paymentMethod,
        description,
      })

      // Reset form and close dialog
      resetForm()
      setOpen(false)
    } catch (error) {
      console.error("Payment submission failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedTenant("")
    setSelectedHouse("")
    setPaymentAmount("")
    setPaymentMethod("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default" className="gap-1">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for the tenant or property.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenant" className="text-right">
                Tenant
              </Label>
              <div className="col-span-3">
                <Select
                  value={selectedTenant}
                  onValueChange={setSelectedTenant}
                >
                  <SelectTrigger id="tenant">
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractData.map((contract) => (
                      <SelectItem
                        key={contract.tenantId}
                        value={contract.tenantId}
                      >
                        {contract.tenantName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="house" className="text-right">
                House No.
              </Label>
              <div className="col-span-3">
                <Select value={selectedHouse} onValueChange={setSelectedHouse}>
                  <SelectTrigger id="house">
                    <SelectValue placeholder="Select house" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractData.map((contract) => (
                      <SelectItem
                        key={contract.houseNumber}
                        value={contract.houseNumber}
                      >
                        {contract.houseNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3">
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method" className="text-right">
                Method
              </Label>
              <div className="col-span-3">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter payment details"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Payment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
