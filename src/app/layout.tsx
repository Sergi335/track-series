import type { Metadata } from 'next'
import 'overlayscrollbars/overlayscrollbars.css'
import React from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Track My Series - Descubre y Sigue tus Series Favoritas',
  description: 'Descubre series de televisión por género, mantén un registro de lo que has visto y encuentra tu próxima serie favorita. Explora ciencia ficción, comedia, misterio y más.'
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
