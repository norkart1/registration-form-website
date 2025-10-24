import { RegistrationForm } from "@/components/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e0e5ec] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-3">
            Register Now
          </h1>
          <p className="text-[#7c8798] text-lg">Join our community by filling out the form below</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
