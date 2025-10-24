import { RegistrationForm } from "@/components/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Register Now</h1>
          <p className="text-gray-600">Join our community by filling out the form below</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
