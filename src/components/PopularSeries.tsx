'use client'
import { Movies } from '@/types'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'

export default function PopularSeries ({ results, totalPages }: { results: Movies[], totalPages: number }) {
  const LIMIT_API_RESULTS = 500
  return (
    <>
      {/* <Filters /> */}
      {
        results.length > 0
          ? <>
            <MovieGrid series={results} />
            {totalPages > 1 && <Pagination totalPages={totalPages > LIMIT_API_RESULTS ? LIMIT_API_RESULTS : totalPages} />}
          </>
          : <h1 className="text-white">Error al recuperar los datos</h1>

      }
    </>
  )
}
