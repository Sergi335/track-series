import PopularSeries from '@/components/PopularSeries'
import SearchResults from '@/components/SearchResults'
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
        <main className="flex flex-col items-center">
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
