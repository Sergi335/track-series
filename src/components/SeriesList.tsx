import { getSeries } from '@/lib/actions'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'
import { type MovieInfo } from '@/types'

export default async function SeriesList ({ page }: { page: string }) {
  const series = await getSeries()

  // The sorting logic from the original component
  const sortedSeries = series.sort((a, b) => {
    const aComplete = a.complete ?? false
    const bComplete = b.complete ?? false
    if (aComplete === bComplete) return 0
    if (aComplete) return 1
    if (bComplete) return -1
    return 0
  })

  const totalPages = Math.ceil(sortedSeries.length / 20)
  const start = (Number(page) - 1) * 20
  const end = start + 20
  const slicedSeries = sortedSeries.slice(start, end)

  return (
    <>
        {
            series.length > 0
              ? (
                  <>
                    <MovieGrid series={slicedSeries as MovieInfo[]} />
                    {totalPages > 1 && <Pagination totalPages={totalPages} />}
                  </>
                )
              : <h1 className='text-white'>No series in your list yet.</h1>
        }
    </>
  )
}
