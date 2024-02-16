import type { SearchResultsType } from '@/types'
import Pagination from './Pagination'
import MovieGrid from './MovieGrid'

export default async function PopularSeries ({ page }: { page: string }) {
  const url = `https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=${page}` // Page, se comparte con searchResults ... ¿?
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const getPopularSeries = async () => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        return { results: [], total_pages: 0, total_results: 0 }
      } else {
        const json = await res.json()
        return json
      }
    } catch (error) {
      console.log(error)
      return { results: [], total_pages: 0, total_results: 0 }
    }
  }
  const { results, total_pages: totalPages, total_results: totalResults }: SearchResultsType = await getPopularSeries()
  const LIMIT_API_RESULTS = 500
  console.log(totalPages, totalResults, results) // TODO: Hacer algo con toralResults
  return (
    <>
        {/* <Filters /> */}
        {
          results.length > 0
            ? <>
                <MovieGrid series={results} />
                {totalPages > 1 && <Pagination totalPages={totalPages > LIMIT_API_RESULTS ? LIMIT_API_RESULTS : totalPages} />}
              </>
            : <h1 className='text-white'>Error al recuperar los datos</h1>

        }
    </>
  )
}
