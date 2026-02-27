import * as seriesService from '@/lib/services/userSeries'
import * as watchlistService from '@/lib/services/userWatchlist'
import { MovieInfo } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useState } from 'react'

export function useUserWatchlist () {
  const { user } = useUser()
  const [watchlist, setWatchlist] = useState<MovieInfo[]>([])
  const [loading, setLoading] = useState(true)

  const loadWatchlist = useCallback(async () => {
    if (!user?.id) {
      setWatchlist([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const data = await watchlistService.getUserWatchlist(user.id)
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
      const loadData = async () => {
        setLoading(true)
        try {
          const data = await watchlistService.getUserWatchlist(user.id)
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
    if (!user?.id) return false

    try {
      // Quitar de series seguidas si está ahí
      await seriesService.unfollowSeries(user.id, seriesData.id)

      // Añadir a watchlist
      const success = await watchlistService.addToWatchlist(user.id, seriesData)
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
    if (!user?.id) return false

    try {
      const success = await watchlistService.removeFromWatchlist(user.id, seriesId)
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
