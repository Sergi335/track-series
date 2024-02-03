import type { SearchResultsType } from '@/types'
// import Link from 'next/link'
import Pagination from './Pagination'
import MovieGrid from './MovieGrid'

export default async function PopularSeries ({ page }: { page: string }) {
  console.log(page)

  const url = `https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${page}` // Page, se comparte con searchResults ... ¿?
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
        <MovieGrid series={results} />
        <Pagination totalPages={totalPages} />
    </>
  )
}
