import Image from 'next/image'

export function Watermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] opacity-5">
        <Image
          src="/logo.png"
          alt="Green World Watermark"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
