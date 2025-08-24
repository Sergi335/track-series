import SearchResults from '@/components/SearchResults'
import SeriesList from '@/components/SeriesList'
import { searchMovies } from '@/lib/data'
import { type Movies } from '@/types'

export default async function MySeries ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'

  let searchResults: Movies[] = []
  if (query.length > 0) {
    searchResults = await searchMovies(query, page)
  }

  return (
    <div className='app flex flex-col'>
      <main className="flex flex-col items-center">
      {query.length > 0
        ? (
            <SearchResults query={query} page={page} results={searchResults} />
          )
        : (
            <SeriesList page={page}/>
          )}
      </main>
    </div>
  )
}
