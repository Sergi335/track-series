'use client'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import ClerkSetupError from './ClerkSetupError'

interface ClerkWrapperProps {
  children: React.ReactNode
}

export default function ClerkWrapper ({ children }: ClerkWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if Clerk is properly configured
  if (publishableKey == null || publishableKey === '' || publishableKey.includes('placeholder')) {
    return <ClerkSetupError />
  }

  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
