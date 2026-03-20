import SearchResults from '@/components/SearchResults'
import SeriesList from '@/components/SeriesList'

export default async function MySeries ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'

  return (

    <>
      {query.length > 0
        ? (
          <SearchResults query={query} page={page} />
          )
        : (
          <SeriesList page={page} />
          )}
    </>

  )
}
