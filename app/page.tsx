import { RegistrationForm } from "@/components/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#5c3d2e] via-[#4a2c1f] to-[#3d2817] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#ffa726] to-[#ff8c42] bg-clip-text text-transparent mb-3">
            Register Now
          </h1>
          <p className="text-[#c9b8a3] text-lg">Join our community by filling out the form below</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
