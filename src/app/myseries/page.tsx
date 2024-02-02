import SeriesList from '@/components/SeriesList'
import SearchResults from '@/components/SearchResults'
import Header from '@/components/Header'
import Nav from '@/components/Nav'

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
      <Header />
      <main className="flex flex-col items-center">
      <Nav />
      {query.length > 0
        ? (
            <SearchResults query={query} page={page} />
          )
        : (
            <SeriesList />
          )}
      </main>
    </>
  )
}
