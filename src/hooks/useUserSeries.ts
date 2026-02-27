import * as seriesService from '@/lib/services/userSeries'
import * as watchlistService from '@/lib/services/userWatchlist'
import { MovieInfo } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useState } from 'react'

export function useUserSeries () {
  const { user } = useUser()
  const [series, setSeries] = useState<MovieInfo[]>([])
  console.log('🚀 ~ useUserSeries ~ series:', series)
  const [loading, setLoading] = useState(true)

  const loadSeries = useCallback(async () => {
    if (!user?.id) {
      setSeries([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const data = await seriesService.getUserSeries(user.id)
      setSeries(data)
    } catch (error) {
      console.error('Error loading series:', error)
      setSeries([])
    } finally {
      setLoading(false)
    }
  }, [user?.id]) // SOLO depende de user?.id

  // Cargar datos solo cuando cambie user?.id
  useEffect(() => {
    if (user?.id) {
      const loadData = async () => {
        setLoading(true)
        try {
          const data = await seriesService.getUserSeries(user.id)
          setSeries(data)
        } catch (error) {
          console.error('Error loading series:', error)
          setSeries([])
        } finally {
          setLoading(false)
        }
      }
      loadData()
    } else {
      setSeries([])
      setLoading(false)
    }
  }, [user?.id]) // SOLO depende de user?.id

  const followSeries = async (seriesData: MovieInfo) => {
    if (!user?.id) return false

    try {
      // Quitar de watchlist si está ahí
      await watchlistService.removeFromWatchlist(user.id, seriesData.id)

      // Añadir a series seguidas
      const success = await seriesService.followSeries(user.id, seriesData)
      if (success) {
        // Actualizar estado local en lugar de recargar desde servidor
        setSeries(prev => {
          // Evitar duplicados
          const filtered = prev.filter(s => s.id !== seriesData.id)
          return [...filtered, {
            ...seriesData,
            watched_season: seriesData.watched_season || 1,
            watched_episode: seriesData.watched_episode || 1,
            complete: seriesData.complete || false
          }]
        })
      }
      return success
    } catch (error) {
      console.error('Error following series:', error)
      return false
    }
  }

  const unfollowSeries = async (seriesId: number) => {
    if (!user?.id) return false

    try {
      const success = await seriesService.unfollowSeries(user.id, seriesId)
      if (success) {
        // Actualizar estado local
        console.log('exito unfollow')

        setSeries(prev => prev.filter(s => s.id !== seriesId))
      }
      return success
    } catch (error) {
      console.error('Error unfollowing series:', error)
      return false
    }
  }

  const updateProgress = async (seriesId: number, updates: {
    watched_season?: number
    watched_episode?: number
    complete?: boolean
  }) => {
    if (!user?.id) return false

    try {
      const success = await seriesService.updateProgress(user.id, seriesId, updates)
      if (success) {
        // Actualizar estado local
        setSeries(prev => prev.map(s =>
          s.id === seriesId
            ? { ...s, ...updates }
            : s
        ))
      }
      return success
    } catch (error) {
      console.error('Error updating progress:', error)
      return false
    }
  }

  const isFollowing = (seriesId: number): boolean => {
    return series.some(s => s.id === seriesId)
  }

  return {
    series,
    loading,
    followSeries,
    unfollowSeries,
    updateProgress,
    isFollowing,
    refetch: loadSeries
  }
}
