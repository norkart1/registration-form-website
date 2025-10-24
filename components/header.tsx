import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] border-b border-emerald-500/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Green World Logo"
              width={40}
              height={40}
              className="object-contain sm:w-12 sm:h-12"
            />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
              Green World
            </h1>
          </Link>
        </div>
      </div>
    </header>
  )
}
