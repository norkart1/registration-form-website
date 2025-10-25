"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, ChevronDown, User } from "lucide-react"
import { ChangePasswordDialog } from "./change-password-dialog"
import Image from "next/image"

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
      
      <div className="relative z-[100]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm relative z-[100]"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <Image
              src="/profile.png"
              alt="Admin Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <ChevronDown className={`h-3 w-3 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[90]" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <Image
                      src="/profile.png"
                      alt="Admin Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Admin</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                </div>
              </div>

              <div className="py-1.5">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setShowPasswordDialog(true)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700 text-sm">Profile Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
