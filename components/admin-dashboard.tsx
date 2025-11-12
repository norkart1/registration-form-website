"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { EditRegistrationDialog } from "./edit-registration-dialog"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { exportToExcel, exportToPDF } from "@/lib/export-utils"
import { Pencil, Trash2, FileSpreadsheet, FileText, User, MessageCircle, Phone, Mail } from "lucide-react"

interface Registration {
  _id: string
  fullName: string
  whatsappNumber: string
  mobileNumber: string
  email: string
  profileImage?: string
  createdAt: string
}

export function AdminDashboard() {
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Registration | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

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

  const openDeleteDialog = (id: string) => {
    setDeletingId(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return

    try {
      const response = await fetch(`/api/registrations/${deletingId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")

      setRegistrations((prev) => prev.filter((r) => r._id !== deletingId))
      toast({
        title: "Success",
        description: "Registration deleted successfully",
      })
      setDeletingId(null)
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
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
      <div className="warm-card rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d1fae5] mb-2">Registrations</h2>
            <p className="text-[#a7f3d0] text-sm sm:text-base">Total: {registrations.length} registrations</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportToExcel(registrations, 'registrations-export')}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden sm:inline">Excel</span>
            </button>
            <button
              onClick={() => exportToPDF(registrations, 'registrations-export')}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
        
        {registrations.length === 0 ? (
          <p className="text-center text-[#a7f3d0] py-12 text-base sm:text-lg">No registrations yet</p>
        ) : (
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <div 
                key={registration._id} 
                className="bg-[#065f46]/20 hover:bg-[#065f46]/30 rounded-xl border border-[#4ade80]/20 p-4 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {registration.profileImage ? (
                        <img 
                          src={registration.profileImage} 
                          alt={registration.fullName}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-[#4ade80]/30"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#065f46]/50 border-2 border-[#4ade80]/30 flex items-center justify-center">
                          <User className="w-8 h-8 text-[#4ade80]/50" />
                        </div>
                      )}
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#d1fae5] mb-3 break-words">
                      {registration.fullName}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#a7f3d0] text-sm">
                        <MessageCircle className="w-4 h-4 flex-shrink-0 text-[#4ade80]" />
                        <span className="break-all">{registration.whatsappNumber || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#a7f3d0] text-sm">
                        <Phone className="w-4 h-4 flex-shrink-0 text-[#4ade80]" />
                        <span className="break-all">{registration.mobileNumber || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#a7f3d0] text-sm">
                        <Mail className="w-4 h-4 flex-shrink-0 text-[#4ade80]" />
                        <span className="break-all">{registration.email}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <EditRegistrationDialog
                        registration={registration}
                        onSave={handleSaveEdit}
                        trigger={
                          <button className="flex-1 sm:flex-none px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md font-medium text-sm">
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        }
                      />
                      <button 
                        onClick={() => openDeleteDialog(registration._id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
