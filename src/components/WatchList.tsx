'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import MovieGrid from './MovieGrid'

export default function WatchList () {
  const { watchlist, loading } = useUserSeriesStore()

  if (loading) {
    return <h1 className="text-white">Cargando tu watchlist...</h1>
  }
  // TODO Paginación
  return (
    <>
      {
        watchlist.length > 0
          ? <MovieGrid series={watchlist} />
          : <h1 className="text-white">No tienes series en tu watchlist</h1>
      }
    </>
  )
}
