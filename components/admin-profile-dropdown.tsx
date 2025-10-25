"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, ChevronDown, User } from "lucide-react"
import { ChangePasswordDialog } from "./change-password-dialog"

export function AdminProfileDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  return (
    <>
      <ChangePasswordDialog 
        open={showPasswordDialog} 
        onOpenChange={setShowPasswordDialog}
      />
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-semibold text-white">Admin</div>
            <div className="text-xs text-emerald-200">Administrator</div>
          </div>
          <ChevronDown className={`h-4 w-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Admin</div>
                    <div className="text-sm text-gray-500">admin@greenworld.com</div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setShowPasswordDialog(true)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Profile Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                >
                  <LogOut className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
