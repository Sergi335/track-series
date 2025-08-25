import type { SearchResultsType } from '@/types'
// import Link from 'next/link'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'
export default async function SearchResults ({ query, page }: { query?: string, page?: string }) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=es-ES&page=${page}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const searchMovies = async () => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        return { results: [], total_pages: 0, total_results: 0, error: true }
      } else {
        const json = await res.json()
        return json
      }
    } catch (error) {
      console.log(error)
      return { results: [], total_pages: 0, total_results: 0, error: true }
    }
  }

  const { results, total_pages: totalPages, total_results: totalResults, error }: SearchResultsType = await searchMovies()
  console.log(totalPages, totalResults, results)

  return (
    <>
      {results.length > 0
        ? (
        <>
          <MovieGrid series={results} />
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </>
          )
        : (
            error !== undefined ? <h1 className='text-white'>Error al recuperar los datos</h1> : <h1 className='text-white'>No results found</h1>
          )}
    </>
  )
}
