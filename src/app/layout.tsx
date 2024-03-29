import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'overlayscrollbars/overlayscrollbars.css'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black bg-no-repeat min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
