'use client'
import { Button } from '@/components/ui/button'
import { addMovieToWatchlist, addSerie, isMovieInWatchlist, isSerieInList, removeMovieFromWatchlist, removeSerie } from '@/lib/actions'
import { fetchMovieInfo } from '@/lib/data'
import { type MovieInfo, type Movies } from '@/types'
import { useEffect, useState, useTransition } from 'react'
import SetChapterControl from './SetChapterControl'
import { CheckIcon, WatchingIcon } from './icons/icons'

export default function Controls ({ data, isInList }: { data: Movies | MovieInfo, isInList?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const checkStatus = async () => {
      const [following, inWatchlist] = await Promise.all([
        isSerieInList(data.id),
        isMovieInWatchlist(data.id)
      ])
      setIsFollowing(following)
      setIsInWatchlist(inWatchlist)
    }
    checkStatus()
  }, [data.id])

  const handleFollow = async () => {
    // Optimistic update
    const wasFollowing = isFollowing
    setIsFollowing(!wasFollowing)

    startTransition(async () => {
      if (wasFollowing) {
        await removeSerie(data.id)
      } else {
        // If the data is partial (from a list), fetch the full info first
        const serieInfo = isInList ? await fetchMovieInfo(data.id) : data as MovieInfo
        await addSerie(serieInfo)
      }
    })
  }

  const handleWatchlist = async () => {
    // Optimistic update
    const wasInWatchlist = isInWatchlist
    setIsInWatchlist(!wasInWatchlist)

    startTransition(async () => {
      if (wasInWatchlist) {
        await removeMovieFromWatchlist(data.id)
      } else {
        await addMovieToWatchlist(data as Movies)
      }
    })
  }

  const buttonListClass = isInList ? 'h-auto px-2 py-2 text-xs' : ''
  const buttonContainerListClass = isInList ? 'px-0' : ''
  const iconsClass = isInList ? 'w-4 h-4' : ''

  return (
        <div className={`p-5 flex items-center gap-3 flex-wrap ${buttonContainerListClass}`}>
            <Button
              className={`${isFollowing ? 'bg-red-700 hover:bg-red-800 ' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`}
              onClick={handleFollow}
              disabled={isPending}
            >
              {isFollowing
                ? (<><CheckIcon className={`${iconsClass}`}/> Following</>)
                : 'Follow'}
            </Button>
            <Button
              className={`${isInWatchlist ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`}
              onClick={handleWatchlist}
              disabled={isPending}
            >
              {isInWatchlist
                ? (<><WatchingIcon className={`${iconsClass}`} /> In Watchlist</>)
                : 'Add to Watchlist'}
            </Button>
            {isFollowing && <SetChapterControl data={data as MovieInfo} isInList={isInList} />}
        </div>
  )
}
