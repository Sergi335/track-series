'use client'
import { type Movies } from '@/types'
import FilterComponent from './Filter'
import PopularSeries from './PopularSeries'
import SearchResults from './SearchResults'

interface FilterClientWrapperProps {
  results: Movies[]
  totalPages: number
  query: string
  page: string
}

export default function FilterClientWrapper ({
  results,
  totalPages,
  query,
  page
}: FilterClientWrapperProps) {
  return (
    <FilterComponent results={results}>
      {(filteredMovies) =>
        query.length > 0
          ? <SearchResults query={query} page={page} results={filteredMovies} />
          : <PopularSeries results={filteredMovies} totalPages={totalPages} />
      }
    </FilterComponent>
  )
}
