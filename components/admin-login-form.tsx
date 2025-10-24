"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, LogIn } from "lucide-react"

export function AdminLoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) throw new Error("Invalid credentials")

      const data = await response.json()
      localStorage.setItem("adminToken", data.token)

      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="warm-card rounded-2xl p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#d1fae5] mb-1 sm:mb-2">Login</h2>
        <p className="text-[#a7f3d0] text-sm sm:text-base">Enter your credentials to access the dashboard</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
            </div>
            <input
              id="username"
              name="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-[#d1fae5] mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-[#10b981]" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}
