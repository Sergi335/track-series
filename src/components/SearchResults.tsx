import type { Movies } from '@/types'
import MovieGrid from './MovieGrid'

interface SearchResultsProps {
  query: string
  page: string
  results: Movies[]
}

export default function SearchResults ({ query, page, results }: SearchResultsProps) {
  return (
    <div>
      {results.length > 0
        ? <MovieGrid series={results} />
        : <h1 className='text-white'>No results found</h1>}
    </div>
  )
}
