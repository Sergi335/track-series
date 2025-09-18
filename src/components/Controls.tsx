'use client'
import { Button } from '@/components/ui/button'
import { fetchMovieInfo } from '@/lib/data'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { type MovieInfo, type Movies } from '@/types'
import { useUser } from '@clerk/nextjs'
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
    removeFromWatchlist
  } = useUserSeriesStore()

  // Usar directamente el estado de Zustand para ambos
  const isFollowing = isFollowingFromStore(data.id)
  const isInWatchlist = isInWatchlistFromStore(data.id)

  const storeMySeriesData = async () => {
    if (!user?.id) return

    let seriesData = data
    // Si el componente se renderiza en moviegrid, no tiene la propiedad seasons, hay que hacer un fetch para traer la info de la serie
    if (isInList === true) {
      seriesData = await fetchMovieInfo(data.id)
    }

    if (isFollowing) {
      await unfollowSeries(data.id, user.id)
    } else {
      await followSeries(seriesData as MovieInfo, user.id)
    }
  }

  const storeWatchlistData = async () => {
    if (!user?.id) return

    if (isInWatchlist) {
      await removeFromWatchlist(data.id, user.id)
    } else {
      await addToWatchlist(data as MovieInfo, user.id)
    }
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
