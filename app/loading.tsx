export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-[8px] border-[#065f46] opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-[#4ade80] border-r-[#4ade80] border-b-[#22c55e] animate-spin"></div>
        </div>
        <p className="text-[#a7f3d0] text-base font-medium">Loading...</p>
      </div>
    </main>
  )
}
