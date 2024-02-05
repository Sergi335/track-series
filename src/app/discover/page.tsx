import Header from '@/components/Header'
import SearchResults from '@/components/SearchResults'
import PopularSeries from '@/components/PopularSeries'
import Nav from '@/components/Nav'
export default function Discover ({
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
            <PopularSeries page={page}/>
            )}
      </main>
    </div>
  )
}
