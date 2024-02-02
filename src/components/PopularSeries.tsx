import type { SearchResultsType } from '@/types'
// import Link from 'next/link'
import Pagination from './Pagination'
import MovieGrid from './MovieGrid'

export default async function PopularSeries ({ page }: { page: string }) {
  console.log(page)

  const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}` // Page, se comparte con searchResults ... ¿?
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTc4MzQ5YTc1YTkzMjZhMjMzYWFmNDU5Mjg1ODcyMiIsInN1YiI6IjY0YzkyZTNlZjJjZjI1MDEzYWFjNWU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyvhvAKMqJk1HtVM5GSzYziXMfa1l_kFTwFQfsggG7Y'
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
