'use client'
import { type MovieInfo } from '@/types'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { CheckIcon, WatchingIcon } from './icons/icons'
import SetChapterControl from './SetChapterControl'

export default function Controls ({ data }: { data: MovieInfo }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  if (window.localStorage.getItem('series') === null) window.localStorage.setItem('series', JSON.stringify([]))
  if (window.localStorage.getItem('watchlist') === null) window.localStorage.setItem('watchlist', JSON.stringify([]))
  const storedMySeriesData = JSON.parse(window.localStorage.getItem('series') ?? '') ?? [] as MovieInfo[]
  const storedWatchlistData = JSON.parse(window.localStorage.getItem('watchlist') ?? '') ?? [] as MovieInfo[]
  const mySeriesIndex = storedMySeriesData.findIndex((item: MovieInfo) => item.id === data.id)
  const watchlistIndex = storedWatchlistData.findIndex((item: MovieInfo) => item.id === data.id)
  useEffect(() => {
    if (mySeriesIndex !== -1) setIsFollowing(true)
    if (watchlistIndex !== -1) setIsInWatchlist(true)
  }, [])
  console.log(data)
  const storeMySeriesData = () => {
    if (storedMySeriesData !== null) {
      if (mySeriesIndex === -1) {
        storedMySeriesData.push(data)
        setIsFollowing(true)
      } else {
        storedMySeriesData.splice(mySeriesIndex, 1)
        setIsFollowing(false)
      }
    }
    window.localStorage.setItem('series', JSON.stringify(storedMySeriesData))
  }
  const storeWatchlistData = () => {
    if (storedWatchlistData !== null) {
      if (watchlistIndex === -1) {
        storedWatchlistData.push(data)
        setIsInWatchlist(true)
      } else {
        storedWatchlistData.splice(watchlistIndex, 1)
        setIsInWatchlist(false)
      }
    }
    window.localStorage.setItem('watchlist', JSON.stringify(storedWatchlistData))
  }
  return (
        <div className="p-5 flex items-center gap-3 flex-wrap">
            <Button className={`${isFollowing ? 'bg-red-600 hover:bg-red-400' : 'bg-blue-600 hover:bg-blue-400'} text-white flex gap-2`} onClick={storeMySeriesData}>
              {
                isFollowing
                  ? (<><CheckIcon /> Following</>)
                  : 'Follow'
              }
            </Button>
            <Button className={`${isInWatchlist ? 'bg-red-600 hover:bg-red-400' : 'bg-blue-600 hover:bg-blue-400'} text-white flex gap-2`} onClick={storeWatchlistData}>
              {
                isInWatchlist
                  ? (<><WatchingIcon /> InWatchList</>)
                  : 'SetInWatchList'
              }
            </Button>
            {
              isFollowing
                ? (<SetChapterControl data={data} />)
                : ''
            }

        </div>
  )
}
