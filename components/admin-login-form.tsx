"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

export function AdminLoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!credentials.username || !credentials.password) {
      setErrorMessage("Please enter both username and password")
      setShowError(true)
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        setErrorMessage("Invalid username or password. Please try again.")
        setShowError(true)
        setLoading(false)
        return
      }

      const data = await response.json()
      localStorage.setItem("adminToken", data.token)

      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      setErrorMessage("Unable to connect to server. Please try again.")
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-12 py-2.5 sm:py-3 warm-input rounded-lg text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#10b981] hover:text-[#4ade80] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
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
    </>
  )
}
