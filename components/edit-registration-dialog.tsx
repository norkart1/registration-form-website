"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"

interface Registration {
  _id: string
  fullName: string
  whatsappNumber: string
  mobileNumber: string
  email: string
  profileImage?: string
  createdAt: string
}

interface EditRegistrationDialogProps {
  registration: Registration
  onSave: (data: Registration) => void
  trigger: React.ReactNode
}

export function EditRegistrationDialog({ registration, onSave, trigger }: EditRegistrationDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(registration)
  const [imagePreview, setImagePreview] = useState<string>(registration.profileImage || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData((prev) => ({ ...prev, profileImage: base64String }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: "" }))
    setImagePreview("")
  }

  const handleSave = () => {
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Registration</DialogTitle>
          <DialogDescription>Update the registration details below</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input id="whatsappNumber" name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input id="mobileNumber" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-lg object-cover border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="profileImageEdit"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Click to upload</p>
                  </div>
                  <input
                    id="profileImageEdit"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
