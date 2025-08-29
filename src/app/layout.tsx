import ClerkWrapper from '@/components/ClerkWrapper'
import { ThemeProvider } from '@/contexts/ThemeContext'
import type { Metadata } from 'next'
import 'overlayscrollbars/overlayscrollbars.css'
import React from 'react'
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
    <ClerkWrapper>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider>

            {children}

          </ThemeProvider>
        </body>
      </html>
    </ClerkWrapper>
  )
}
