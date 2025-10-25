"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { EditRegistrationDialog } from "./edit-registration-dialog"
import { Pencil, Trash2 } from "lucide-react"

interface Registration {
  _id: string
  fullName: string
  email: string
  createdAt: string
}

export function AdminDashboard() {
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Registration | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registrations")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return

    try {
      const response = await fetch(`/api/registrations/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")

      setRegistrations((prev) => prev.filter((r) => r._id !== id))
      toast({
        title: "Success",
        description: "Registration deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (registration: Registration) => {
    setEditingId(registration._id)
    setEditData(registration)
  }

  const handleSaveEdit = async (updatedData: Registration) => {
    try {
      const response = await fetch(`/api/registrations/${updatedData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) throw new Error("Failed to update")

      setRegistrations((prev) => prev.map((r) => (r._id === updatedData._id ? updatedData : r)))
      setEditingId(null)
      setEditData(null)

      toast({
        title: "Success",
        description: "Registration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update registration",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading registrations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="warm-card rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#d1fae5] mb-2">Registrations</h2>
          <p className="text-[#a7f3d0] text-sm sm:text-base">Total: {registrations.length} registrations</p>
        </div>
        
        {registrations.length === 0 ? (
          <p className="text-center text-[#a7f3d0] py-12 text-base sm:text-lg">No registrations yet</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 px-4 py-3 border-b-2 border-[#4ade80]/50">
              <div className="font-semibold text-[#4ade80] text-sm sm:text-base">Full Name</div>
              <div className="font-semibold text-[#4ade80] text-sm sm:text-base">Email</div>
              <div className="font-semibold text-[#4ade80] text-sm sm:text-base">Actions</div>
            </div>
            
            {registrations.map((registration, index) => (
              <div 
                key={registration._id} 
                className="grid grid-cols-3 gap-4 px-4 py-4 bg-[#065f46]/20 hover:bg-[#065f46]/40 rounded-xl transition-all border border-[#4ade80]/20"
              >
                <div className="text-[#d1fae5] font-medium text-sm sm:text-base flex items-center">
                  {registration.fullName}
                </div>
                <div className="text-[#a7f3d0] text-sm sm:text-base flex items-center break-all">
                  {registration.email}
                </div>
                <div className="flex items-center gap-2">
                  <EditRegistrationDialog
                    registration={registration}
                    onSave={handleSaveEdit}
                    trigger={
                      <button className="p-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md">
                        <Pencil className="w-4 h-4" />
                      </button>
                    }
                  />
                  <button 
                    onClick={() => handleDelete(registration._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
