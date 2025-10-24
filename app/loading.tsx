export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#4ade80] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#a7f3d0] text-sm">Loading...</p>
      </div>
    </main>
  )
}
