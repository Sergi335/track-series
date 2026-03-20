import SearchResults from '@/components/SearchResults'
import WatchList from '@/components/WatchList'

export default function Watchlist ({
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
          <WatchList />
          )}
    </>

  )
}
