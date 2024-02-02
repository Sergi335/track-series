import type { SearchResultsType } from '@/types'
// import Link from 'next/link'
import Pagination from './Pagination'
import MovieGrid from './MovieGrid'
export default async function SearchResults ({ query, page }: { query: string, page: string }) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=es-ES&page=${page}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const searchMovies = async () => {
    const res = await fetch(url, options)
    const json = await res.json()
    console.log(json)
    return json
  }
  const { results, total_pages: totalPages, total_results: totalResults }: SearchResultsType = await searchMovies()
  console.log(totalPages, totalResults)

  return (
        <>
          <MovieGrid series={results} />
          <Pagination totalPages={totalPages} />
        </>
  )
}
