import { UserSeriesService } from '@/lib/services/userSeries'
import { UserWatchlistService } from '@/lib/services/userWatchlist'
import { MovieInfo } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useUserSeries () {
  const { user } = useUser()
  const [series, setSeries] = useState<MovieInfo[]>([])
  const [loading, setLoading] = useState(true)

  // Memoizar servicios para evitar recreación
  const seriesService = useMemo(() =>
    user?.id ? new UserSeriesService(user.id) : null,
  [user?.id]
  )

  const watchlistService = useMemo(() =>
    user?.id ? new UserWatchlistService(user.id) : null,
  [user?.id]
  )

  const loadSeries = useCallback(async () => {
    if (!user?.id) {
      setSeries([])
      setLoading(false)
      return
    }

    const service = new UserSeriesService(user.id)
    setLoading(true)
    try {
      const data = await service.getUserSeries()
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
      const service = new UserSeriesService(user.id)
      const loadData = async () => {
        setLoading(true)
        try {
          const data = await service.getUserSeries()
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
    if (!seriesService || !watchlistService || !user?.id) return false

    try {
      // Quitar de watchlist si está ahí
      await watchlistService.removeFromWatchlist(seriesData.id)

      // Añadir a series seguidas
      const success = await seriesService.followSeries(seriesData)
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
    if (!seriesService || !user?.id) return false

    try {
      const success = await seriesService.unfollowSeries(seriesId)
      if (success) {
        // Actualizar estado local
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
    if (!seriesService || !user?.id) return false

    try {
      const success = await seriesService.updateProgress(seriesId, updates)
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
