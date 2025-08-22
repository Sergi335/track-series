import FilterClientWrapper from '@/components/FilterClientWrapper'
// import { useFilterMovies } from '@/hooks/useFilterMovies'
import { type SearchResultsType } from '@/types'
export default async function Discover ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'
  const url = `https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=${page}` // Page, se comparte con searchResults ... ¿?
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const getPopularSeries = async () => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        return { results: [], total_pages: 0, total_results: 0 }
      } else {
        const json = await res.json()
        return json
      }
    } catch (error) {
      console.log(error)
      return { results: [], total_pages: 0, total_results: 0 }
    }
  }
  const { results, total_pages: totalPages, total_results: totalResults }: SearchResultsType = await getPopularSeries()
  // const { filteredMovies } = useFilterMovies({ movies: results })

  console.log(totalPages, totalResults, results) // TODO: Hacer algo con toralResults
  return (
    <div className='app flex flex-col'>
      <main className="flex flex-col items-center">
        <FilterClientWrapper
          results={results}
          totalPages={totalPages}
          query={query}
          page={page}
        />
      </main>
    </div>
  )
}
