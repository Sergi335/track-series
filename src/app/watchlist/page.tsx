import Header from '@/components/Header'
import Nav from '@/components/Nav'
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
    <div className='app flex flex-col'>
        <Header />
        <main className="flex flex-col items-center">
        <Nav />
        {query.length > 0
          ? (
            <SearchResults query={query} page={page} />
            )
          : (
            <WatchList />
            )}
      </main>

    </div>
  )
}
