'use client'
import { Button } from '@/components/ui/button'
import { fetchMovieInfo } from '@/lib/data'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { type MovieInfo, type Movies } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useEffect, useRef, useState } from 'react'
import SetChapterControl from './SetChapterControl'
import { CheckIcon, WatchingIcon } from './icons/icons'

export default function Controls ({ data, isInList }: { data: Movies | MovieInfo, isInList?: boolean }) {
  const { user } = useUser()
  const {
    isFollowing: isFollowingFromStore,
    followSeries,
    unfollowSeries,
    isInWatchlist: isInWatchlistFromStore,
    addToWatchlist,
    removeFromWatchlist,
    series
  } = useUserSeriesStore()

  // Estados locales optimistas
  const [localIsFollowing, setLocalIsFollowing] = useState<boolean | null>(null)
  const [localIsInWatchlist, setLocalIsInWatchlist] = useState<boolean | null>(null)
  const [seriesData, setSeriesData] = useState<MovieInfo | null>(series.find(mov => mov.id === data.id) ?? null)

  // Referencias para debounce
  const followingTimeoutRef = useRef<number>()
  const watchlistTimeoutRef = useRef<number>()

  // Estados efectivos
  const isFollowing = localIsFollowing !== null ? localIsFollowing : isFollowingFromStore(data.id)
  const isInWatchlist = localIsInWatchlist !== null ? localIsInWatchlist : isInWatchlistFromStore(data.id)

  // Debounced follow toggle - SIMPLIFICADO
  const handleFollowToggle = () => {
    if (!user?.id) return

    // 1. Cambio visual inmediato
    const newState = !isFollowing
    setLocalIsFollowing(newState)

    // 2. Limpiar timeout anterior
    if (followingTimeoutRef.current) {
      clearTimeout(followingTimeoutRef.current)
    }

    // 3. Programar petición
    followingTimeoutRef.current = window.setTimeout(async () => {
      try {
        const movieCompleteData = await fetchMovieInfo(data.id)
        setSeriesData(movieCompleteData)
        // Usar el estado local actual en lugar de calcularlo
        if (newState) {
          await followSeries(movieCompleteData, user.id)
        } else {
          await unfollowSeries(data.id, user.id)
        }

        // Sincronizar con store solo después de éxito/error
        setLocalIsFollowing(null)
      } catch (error) {
        console.error('Error in follow operation:', error)
        setLocalIsFollowing(null)
      }
    }, 500)
  }

  // Debounced watchlist toggle - SIMPLIFICADO
  const handleWatchlistToggle = () => {
    if (!user?.id) return

    // 1. Cambio visual inmediato
    const newState = !isInWatchlist
    setLocalIsInWatchlist(newState)

    // 2. Limpiar timeout anterior
    if (watchlistTimeoutRef.current) {
      clearTimeout(watchlistTimeoutRef.current)
    }

    // 3. Programar petición
    watchlistTimeoutRef.current = window.setTimeout(async () => {
      try {
        // Usar el estado local actual en lugar de calcularlo
        if (newState) {
          await addToWatchlist(data as MovieInfo, user.id)
        } else {
          await removeFromWatchlist(data.id, user.id)
        }

        // Sincronizar con store solo después de éxito/error
        setLocalIsInWatchlist(null)
      } catch (error) {
        console.error('Error in watchlist operation:', error)
        setLocalIsInWatchlist(null)
      }
    }, 500)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (followingTimeoutRef.current) clearTimeout(followingTimeoutRef.current)
      if (watchlistTimeoutRef.current) clearTimeout(watchlistTimeoutRef.current)
    }
  }, [])

  // Estilos condicionales
  let buttonListClass, buttonContainerListClass, iconsClass
  if (isInList !== undefined && isInList) {
    buttonListClass = 'h-auto px-2 py-2 text-xs'
    buttonContainerListClass = 'px-0'
    iconsClass = 'w-4 h-4'
  } else {
    buttonListClass = ''
    buttonContainerListClass = ''
    iconsClass = ''
  }

  return (
    <div className={`p-5 flex items-center gap-3 flex-wrap ${buttonContainerListClass}`}>
      {isFollowing && seriesData !== null && (
        <SetChapterControl data={seriesData as MovieInfo} isInList={isInList} />
      )}
      <div className="flex gap-3 flex-wrap">
        <Button
          className={`${isFollowing ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`}
          onClick={handleFollowToggle}
        >
          {isFollowing
            ? (<><CheckIcon className={`${iconsClass}`}/> Following</>)
            : 'Follow'
          }
        </Button>

        <Button
          className={`${isInWatchlist ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`}
          onClick={handleWatchlistToggle}
        >
          {isInWatchlist
            ? (<><WatchingIcon className={`${iconsClass}`} /> InWatchList</>)
            : 'SetInWatchList'
          }
        </Button>
      </div>
    </div>
  )
}
