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
    <div className='app flex flex-col'>
      <main className="flex flex-col items-center">
      {query.length > 0
        ? (
            <SearchResults query={query} page={page} />
          )
        : (
            <SeriesList page={page}/>
          )}
      </main>
    </div>
  )
}
