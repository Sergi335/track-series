'use client'
import { Button } from '@/components/ui/button'
import { fetchMovieInfo } from '@/lib/data'
import { type MovieInfo, type Movies } from '@/types'
import { useEffect, useState } from 'react'
import SetChapterControl from './SetChapterControl'
import { CheckIcon, WatchingIcon } from './icons/icons'

export default function Controls ({ data, isInList }: { data: Movies | MovieInfo, isInList?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  if (window.localStorage.getItem('series') === null) window.localStorage.setItem('series', JSON.stringify([]))
  if (window.localStorage.getItem('watchlist') === null) window.localStorage.setItem('watchlist', JSON.stringify([]))
  const storedMySeriesData = JSON.parse(window.localStorage.getItem('series') ?? '') ?? [] as MovieInfo[]
  const storedWatchlistData = JSON.parse(window.localStorage.getItem('watchlist') ?? '') ?? [] as Movies[]
  const mySeriesIndex = storedMySeriesData.findIndex((item: MovieInfo) => item.id === data.id)
  const watchlistIndex = storedWatchlistData.findIndex((item: Movies) => item.id === data.id)
  useEffect(() => {
    if (mySeriesIndex !== -1) setIsFollowing(true)
    if (watchlistIndex !== -1) setIsInWatchlist(true)
  }, [mySeriesIndex, watchlistIndex])
  // console.log(data)
  const storeMySeriesData = async () => {
    // Si el componente se renderiza en moviegrid, no tiene la propiedad seasons, hay que hacer un fetch para traer la info de la serie
    if (isInList === true) {
      data = await fetchMovieInfo(data.id)
    }
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
    const storeEvent = new Event('storageEvent')
    window.dispatchEvent(storeEvent)
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
  // Si le damos a follow desde la lista peta por que le pasamos un objeto que no tiene la propiedad seasons, if isFollowing hacer un fetch para traer la info de la serie
  return (
        <div className={`p-5 flex items-center gap-3 flex-wrap ${buttonContainerListClass}`}>
            <Button className={`${isFollowing ? 'bg-red-700 hover:bg-red-800 ' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`} onClick={storeMySeriesData}>
              {
                isFollowing
                  ? (<><CheckIcon className={`${iconsClass}`}/> Following</>)
                  : 'Follow'
              }
            </Button>
            <Button className={`${isInWatchlist ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'} text-white flex gap-2 transition-colors duration-500 ${buttonListClass}`} onClick={storeWatchlistData}>
              {
                isInWatchlist
                  ? (<><WatchingIcon className={`${iconsClass}`} /> InWatchList</>)
                  : 'SetInWatchList'
              }
            </Button>
            {
              isFollowing
                ? (<SetChapterControl data={data as MovieInfo} isInList={isInList} />)
                : ''
            }

        </div>
  )
}
