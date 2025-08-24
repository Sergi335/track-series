import { getWatchlist } from '@/lib/actions'
import MovieGrid from './MovieGrid'
import { type Movies } from '@/types'

export default async function WatchList () {
  const series = await getWatchlist()

  return (
    <>
        {
            series.length > 0
              ? <MovieGrid series={series as Movies[]} />
              : <h1 className='text-white'>No series in your watchlist yet.</h1>
        }
    </>
  )
}
