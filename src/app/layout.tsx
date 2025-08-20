import type { Metadata } from 'next'
import 'overlayscrollbars/overlayscrollbars.css'
import React from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Track My Series',
  description: 'Track your favorite TV series and movies'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-900 dark:to-black min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
