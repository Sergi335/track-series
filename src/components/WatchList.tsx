'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import MovieGrid from './MovieGrid'
import MovieGridLoader from './MovieGridLoader'

export default function WatchList () {
  const { watchlist, loading } = useUserSeriesStore()

  if (loading) {
    return <MovieGridLoader />
  }
  // TODO Paginación
  return (
    <>
      {
        !loading && watchlist.length > 0 && <MovieGrid series={watchlist} />
      }
      {
        loading && <MovieGridLoader />
      }
      {
        !loading && watchlist.length === 0 && <h1 className="text-white">No tienes series en tu watchlist</h1>
      }
    </>
  )
}
