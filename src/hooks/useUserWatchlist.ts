import { UserSeriesService } from '@/lib/services/userSeries'
import { UserWatchlistService } from '@/lib/services/userWatchlist'
import { MovieInfo } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useUserWatchlist () {
  const { user } = useUser()
  const [watchlist, setWatchlist] = useState<MovieInfo[]>([])
  const [loading, setLoading] = useState(true)

  // Memoizar servicios para evitar recreación
  const watchlistService = useMemo(() =>
    user?.id ? new UserWatchlistService(user.id) : null,
  [user?.id]
  )

  const seriesService = useMemo(() =>
    user?.id ? new UserSeriesService(user.id) : null,
  [user?.id]
  )

  const loadWatchlist = useCallback(async () => {
    if (!user?.id) {
      setWatchlist([])
      setLoading(false)
      return
    }

    const service = new UserWatchlistService(user.id)
    setLoading(true)
    try {
      const data = await service.getUserWatchlist()
      setWatchlist(data)
    } catch (error) {
      console.error('Error loading watchlist:', error)
      setWatchlist([])
    } finally {
      setLoading(false)
    }
  }, [user?.id]) // SOLO depende de user?.id

  // Cargar datos solo cuando cambie user?.id
  useEffect(() => {
    if (user?.id) {
      const service = new UserWatchlistService(user.id)
      const loadData = async () => {
        setLoading(true)
        try {
          const data = await service.getUserWatchlist()
          setWatchlist(data)
        } catch (error) {
          console.error('Error loading watchlist:', error)
          setWatchlist([])
        } finally {
          setLoading(false)
        }
      }
      loadData()
    } else {
      setWatchlist([])
      setLoading(false)
    }
  }, [user?.id]) // SOLO depende de user?.id

  const addToWatchlist = async (seriesData: MovieInfo) => {
    if (!watchlistService || !seriesService || !user?.id) return false

    try {
      // Quitar de series seguidas si está ahí
      await seriesService.unfollowSeries(seriesData.id)

      // Añadir a watchlist
      const success = await watchlistService.addToWatchlist(seriesData)
      if (success) {
        // Actualizar estado local
        setWatchlist(prev => {
          const filtered = prev.filter(s => s.id !== seriesData.id)
          return [...filtered, seriesData]
        })
      }
      return success
    } catch (error) {
      console.error('Error adding to watchlist:', error)
      return false
    }
  }

  const removeFromWatchlist = async (seriesId: number) => {
    if (!watchlistService || !user?.id) return false

    try {
      const success = await watchlistService.removeFromWatchlist(seriesId)
      if (success) {
        // Actualizar estado local
        setWatchlist(prev => prev.filter(s => s.id !== seriesId))
      }
      return success
    } catch (error) {
      console.error('Error removing from watchlist:', error)
      return false
    }
  }

  const isInWatchlist = (seriesId: number): boolean => {
    return watchlist.some(s => s.id === seriesId)
  }

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    refetch: loadWatchlist
  }
}
