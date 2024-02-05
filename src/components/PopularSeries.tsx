import type { SearchResultsType } from '@/types'
// import Link from 'next/link'
import Pagination from './Pagination'
import MovieGrid from './MovieGrid'
// import Filters from './Filters'

export default async function PopularSeries ({ page }: { page: string }) {
  console.log(page)

  const url = `https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=${page}` // Page, se comparte con searchResults ... ¿?
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const getPopularSeries = async () => {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  }
  const { results, total_pages: totalPages, total_results: totalResults }: SearchResultsType = await getPopularSeries()
  console.log(totalPages, totalResults)
  return (
    <>
        {/* <Filters /> */}
        <MovieGrid series={results} />
        <Pagination totalPages={totalPages > 500 ? 500 : totalPages} />
    </>
  )
}
