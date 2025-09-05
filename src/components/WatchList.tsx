'use client'
import { useUserWatchlist } from '@/hooks/useUserWatchlist'
import MovieGrid from './MovieGrid'

export default function WatchList () {
  const { watchlist, loading } = useUserWatchlist()

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
