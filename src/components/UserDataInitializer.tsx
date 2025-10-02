'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

interface UserDataInitializerProps {
  children: React.ReactNode
}

export function UserDataInitializer ({ children }: UserDataInitializerProps) {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const initializeUser = useUserSeriesStore(state => state.initializeUser)
  const clearUserData = useUserSeriesStore(state => state.clearUserData)

  useEffect(() => {
    if (isLoaded) {
      if (user?.id) {
        console.log('🔑 Usuario detectado, obteniendo token y datos:', user.id)
        getToken({ template: 'supabase' }).then(token => {
          if (token) {
            initializeUser(user.id, token)
          } else {
            console.warn('⚠️ No se pudo obtener el token de Clerk')
          }
        })
      } else {
        console.log('🚪 No hay usuario, limpiando datos')
        clearUserData()
      }
    }
  }, [user?.id, isLoaded, getToken, initializeUser, clearUserData])

  return <>{children}</>
}
