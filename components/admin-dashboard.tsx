"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { EditRegistrationDialog } from "./edit-registration-dialog"

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
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead className="border-b border-[#4ade80]/30">
                <tr>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-[#4ade80]">Full Name</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-[#4ade80]">Email</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-[#4ade80]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration._id} className="border-b border-[#065f46] hover:bg-[#065f46]/30 transition-colors">
                    <td className="py-3 sm:py-4 px-3 sm:px-4 text-[#d1fae5]">{registration.fullName}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 text-[#d1fae5]">{registration.email}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 space-x-2">
                      <EditRegistrationDialog
                        registration={registration}
                        onSave={handleSaveEdit}
                        trigger={
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm transition-colors">
                            Edit
                          </button>
                        }
                      />
                      <button 
                        onClick={() => handleDelete(registration._id)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
