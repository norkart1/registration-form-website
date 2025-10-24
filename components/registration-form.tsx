"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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
    <div className="neomorphism rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Registration Form</h2>
        <p className="text-[#7c8798]">Please provide your information below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-[#2c3e50] mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 neomorphism-inset rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#667eea] bg-transparent text-[#2c3e50] placeholder:text-[#7c8798]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-[#2c3e50] mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 neomorphism-inset rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#667eea] bg-transparent text-[#2c3e50] placeholder:text-[#7c8798]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 neomorphism-button rounded-xl text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  )
}
