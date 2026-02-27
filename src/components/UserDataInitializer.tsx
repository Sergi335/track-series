'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

interface UserDataInitializerProps {
  children: React.ReactNode
}

export function UserDataInitializer ({ children }: UserDataInitializerProps) {
  const { user, isLoaded } = useUser()
  const initializeUser = useUserSeriesStore(state => state.initializeUser)
  const clearUserData = useUserSeriesStore(state => state.clearUserData)

  useEffect(() => {
    if (isLoaded) {
      if (user?.id) {
        console.log('🔑 Usuario detectado, inicializando datos desde Turso:', user.id)
        initializeUser(user.id)
      } else {
        console.log('🚪 No hay usuario, limpiando datos')
        clearUserData()
      }
    }
  }, [user?.id, isLoaded, initializeUser, clearUserData])

  return <>{children}</>
}
