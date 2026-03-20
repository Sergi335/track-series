import type { SearchResultsType } from '@/types'
import ClientSearchResults from './ClientSearchResults'

export default async function SearchResults ({ query, page, className }: { query?: string, page?: string, className?: string }) {
  const encodedQuery = encodeURIComponent(query ?? '')
  const url = `https://api.themoviedb.org/3/search/tv?query=${encodedQuery}&include_adult=false&language=es-ES&page=${page}`
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
  console.log('🚀 ~ SearchResults ~ totalResults:', totalResults)

  return (
    <ClientSearchResults results={results} totalPages={totalPages} error={error} className={className} />
  )
}
