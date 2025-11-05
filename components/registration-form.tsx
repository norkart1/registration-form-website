"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, LogIn, CheckCircle2, AlertCircle, Phone, MessageCircle, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function RegistrationForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [profileImage, setProfileImage] = useState<string>("")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    mobileNumber: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size must be less than 5MB")
        setShowError(true)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage("")
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.whatsappNumber || !formData.mobileNumber || !formData.email) {
      setErrorMessage("Please fill in all fields")
      setShowError(true)
      return
    }

    if (!formData.email.includes('@')) {
      setErrorMessage("Please enter a valid email address")
      setShowError(true)
      return
    }

    if (!profileImage) {
      setErrorMessage("Please upload a profile image")
      setShowError(true)
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileImage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to submit registration")
      }

      setFormData({ fullName: "", whatsappNumber: "", mobileNumber: "", email: "" })
      setProfileImage("")
      setImagePreview("")
      setShowSuccess(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit registration. Please try again.")
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-gradient-to-br from-[#064e3b] to-[#065f46] border-emerald-500/30 p-6 sm:max-w-sm" showCloseButton={false}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-emerald-100">
              SUCCESS
            </h2>
            <p className="text-emerald-200/90 text-sm">
              Your account has been successfully created!
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full mt-2 py-2.5 px-6 warm-button rounded-lg text-white font-semibold text-sm"
            >
              Continue
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="bg-gradient-to-br from-[#7f1d1d] to-[#991b1b] border-red-500/30 p-6 sm:max-w-sm" showCloseButton={false}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 border-2 border-red-400">
              <AlertCircle className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-100">
              ERROR
            </h2>
            <p className="text-red-200/90 text-sm">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              className="w-full mt-2 py-2.5 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-semibold text-sm transition-all"
            >
              Try Again
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="warm-card rounded-2xl p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#d1fae5] mb-1 sm:mb-2">Registration Form</h2>
        <p className="text-[#a7f3d0] text-sm sm:text-base">Please provide your information below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
            </div>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="whatsappNumber" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            WhatsApp Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
            </div>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#10b981]" />
            </div>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#10b981]" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="profileImage" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Profile Image
          </label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-32 w-32 rounded-lg object-cover border-2 border-emerald-500/30"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="profileImage"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-500/30 border-dashed rounded-lg cursor-pointer hover:border-emerald-500/50 transition-colors warm-input"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-emerald-400 mb-2" />
                  <p className="text-sm text-emerald-200">Click to upload profile image</p>
                  <p className="text-xs text-emerald-300/60 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 sm:py-3.5 px-4 warm-button rounded-lg text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-2 mt-2"
        >
          <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
    </>
  )
}
