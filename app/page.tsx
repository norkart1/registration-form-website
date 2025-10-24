import { RegistrationForm } from "@/components/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent mb-3">
            Register Now
          </h1>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
