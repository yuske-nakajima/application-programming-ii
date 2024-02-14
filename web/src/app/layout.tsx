import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const font = Noto_Sans_JP({ subsets: ['latin'], weight: '900' })

export const metadata: Metadata = {
  title: '室温計',
  description: '室温計',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={font.className}>{children}</body>
    </html>
  )
}
