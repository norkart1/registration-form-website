import { RegistrationForm } from "@/components/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent mb-3">
            Register Now
          </h1>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
