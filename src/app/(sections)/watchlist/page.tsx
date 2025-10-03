import FilterComponent from '@/components/Filter'
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
          <section className="flex w-3/4 gap-8 mt-16">
            <div>
              <FilterComponent />
            </div>
            <div className="flex-1">
              <WatchList />
            </div>
          </section>
          )}
    </>

  )
}
