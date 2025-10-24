"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, LogIn } from "lucide-react"

export function RegistrationForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
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

      toast({
        title: "Success",
        description: "Registration submitted successfully!",
      })

      setFormData({ fullName: "", email: "" })
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
    <div className="warm-card rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#d1fae5] mb-1">Registration Form</h2>
        <p className="text-[#a7f3d0] text-sm">Please provide your information below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-[#d1fae5] mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-[#4ade80]" />
            </div>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 warm-input rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-[#d1fae5] mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#10b981]" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-2.5 warm-input rounded-lg text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 warm-button rounded-lg text-white font-semibold text-base flex items-center justify-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  )
}
