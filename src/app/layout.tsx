// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GOROLL - Accessible Journeys',
  description: 'A platform for accessible journeys and inclusive communities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Navbar />
        </div>
      </body>
    </html>
  )
}