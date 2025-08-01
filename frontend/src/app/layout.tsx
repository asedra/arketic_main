import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arketic AI',
  description: 'AI-powered compliance and knowledge management platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
