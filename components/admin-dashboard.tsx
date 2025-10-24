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
      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
          <CardDescription>Total: {registrations.length} registrations</CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No registrations yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Full Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr key={registration._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{registration.fullName}</td>
                      <td className="py-3 px-4">{registration.email}</td>
                      <td className="py-3 px-4 space-x-2">
                        <EditRegistrationDialog
                          registration={registration}
                          onSave={handleSaveEdit}
                          trigger={
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          }
                        />
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(registration._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
