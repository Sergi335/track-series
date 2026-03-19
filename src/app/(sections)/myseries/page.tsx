import FilterComponent from '@/components/Filter'
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
          <section className="flex w-3/4 gap-8 mt-16">
            <div className="p-8 border border-gray-700 rounded-[32px] bg-[#031321] w-[325px] h-fit z-10">
              <FilterComponent />
            </div>
            <div className="movie_grid_overflow flex-1 max-h-[75vh] overflow-y-auto">
              <SeriesList page={page} />
            </div>
          </section>
          )}
    </>

  )
}
