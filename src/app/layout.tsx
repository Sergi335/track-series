import ClerkWrapper from '@/components/ClerkWrapper'
import { UserDataInitializer } from '@/components/UserDataInitializer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'overlayscrollbars/overlayscrollbars.css'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Track My Series - Descubre y Sigue tus Series Favoritas',
  description: 'Descubre series de televisión por género, mantén un registro de lo que has visto y encuentra tu próxima serie favorita. Explora ciencia ficción, comedia, misterio y más.'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  let theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (_) {}
              })();
            `
            }}
          />
        </head>
        <body className={`${inter.variable} font-sans`}>
          <ThemeProvider>
            <UserDataInitializer>
              {children}
            </UserDataInitializer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkWrapper>
  )
}
