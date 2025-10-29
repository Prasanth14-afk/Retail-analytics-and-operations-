import type { Metadata } from 'next'
import './globals.css'
import { DataProvider } from '@/components/DataProvider'

export const metadata: Metadata = {
  title: 'PulseRetail - Analytics Hub',
  description: 'Real-time Retail Intelligence & Analytics Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  )
}
