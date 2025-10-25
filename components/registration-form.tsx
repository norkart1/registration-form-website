"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, LogIn, CheckCircle2 } from "lucide-react"
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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit form")

      setFormData({ fullName: "", email: "" })
      setShowSuccess(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-white border-0 p-0 sm:max-w-md overflow-hidden" showCloseButton={false}>
          <div className="bg-gradient-to-br from-[#7bc74d] to-[#65b93d] py-12 px-6 flex flex-col items-center justify-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-transparent">
              <CheckCircle2 className="h-12 w-12 text-white stroke-[3]" />
            </div>
            <h2 className="text-white text-2xl font-semibold tracking-wider">
              SUCCESS
            </h2>
          </div>
          <div className="bg-white px-8 py-10 text-center">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Congratulations, your account has been successfully created.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-[#7bc74d] to-[#65b93d] hover:from-[#6ab33d] hover:to-[#58a32d] text-white font-medium py-3 px-12 rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue
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
