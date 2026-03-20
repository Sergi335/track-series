'use client'
import { Movies } from '@/types'
import { useEffect, useState } from 'react'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'
import SearchResultsFilters from './SearchResultsFilters'
export default function ClientSearchResults ({ results, totalPages, error, className }: {results: Movies[], totalPages: number, error?: boolean, className?: string}) {
  const [filteredResults, setFilteredResults] = useState<Movies[]>(results)
  console.log('🚀 ~ ClientSearchResults ~ filteredResults:', filteredResults.length)
  const moviesPerPage = 20

  useEffect(() => {
    setFilteredResults(results)
  }, [results])

  return (
    <>
      {results.length > 0
        ? (
          <>
            <section className={`flex flex-col gap-8 ${className}`}>
              <div className="">
                <SearchResultsFilters results={results} setResults={setFilteredResults} />
              </div>
              <div className="flex-1">
                <MovieGrid series={filteredResults} />
                {filteredResults.length >= moviesPerPage && <Pagination totalPages={totalPages} />}
              </div>
            </section>
          </>
          )
        : (
            error !== undefined
              ? <h1 className="text-white">Error al recuperar los datos</h1>
              : <h1 className="text-white">No results found</h1>
          )}
    </>
  )
}
