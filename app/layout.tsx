import type { Metadata } from 'next'
import { Anek_Latin } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Watermark } from '@/components/watermark'
import './globals.css'

const anekLatin = Anek_Latin({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Registration App',
  description: 'Join our community',
  icons: {
    icon: '/icon',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${anekLatin.variable} font-sans antialiased relative`}>
        <Watermark />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
