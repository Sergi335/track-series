import Header from '@/components/Header'
import MovieGrid from '@/components/MovieGrid'
import Nav from '@/components/Nav'
import Pagination from '@/components/Pagination'
import SearchResults from '@/components/SearchResults'
import { type SearchResultsType } from '@/types'

export default async function FeaturedSeries ({ searchParams, params }: { searchParams?: { query?: string, page?: string }, params: { argument: string } }) {
  console.log(params.argument)
  const genre = params.argument
  const genres: Record<string, number> = {
    action: 10759,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    kids: 10762,
    mystery: 9648,
    news: 10763,
    reality: 10764,
    scifi: 10765,
    soap: 10766,
    talk: 10767,
    warPolitics: 10768,
    western: 37
  }
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${genres[genre]}&without_genres=16`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE4MWM2MDRjY2U5ZTJlODViNGRhMDBmM2ZiZjBiZiIsInN1YiI6IjY0YzkyZTNlZjJjZjI1MDEzYWFjNWU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vEtC1rtc1710_h2zhocjUb4GN8kDqlJqzpM-dowTIfI'
    }
  }
  const fetchMovies = async () => {
    const res = await fetch(url, options)
    const json = await res.json()
    // console.log(json)
    return json
  }
  const { results, total_pages: totalPages }: SearchResultsType = await fetchMovies()
  const LIMIT_API_RESULTS = 500

  return (
    <div className='app flex flex-col'>
        <Header />
        <main className="flex flex-col items-center">
        <Nav />
        {query.length > 0
          ? (
            <SearchResults query={query} page={page} />
            )
          : (
            <>
              <MovieGrid series={results}/>
              {totalPages > 1 && <Pagination totalPages={totalPages > LIMIT_API_RESULTS ? LIMIT_API_RESULTS : totalPages} />}
            </>
            )}
      </main>
    </div>
  )
}
