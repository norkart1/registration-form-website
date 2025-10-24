import { AdminLoginForm } from "@/components/admin-login-form"

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent mb-3">
            Admin Dashboard
          </h1>
          <p className="text-[#a7f3d0] text-sm sm:text-base">Sign in to manage registrations</p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  )
}
