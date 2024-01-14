import SearchResults from '@/components/SearchResults'
import Search from '@/components/Search'
import SeriesList from '@/components/SeriesList'

export default async function Home ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  // console.log(searchParams)
  const query = searchParams?.query ?? ''
  // console.log(query.length)

  return (
    <div className='app flex flex-col'>
      <header className='flex justify-center py-6'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Track My</span> Series.</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-24">
        <section className='flex flex-wrap justify-center w-[1400px]'>
          <Search />
        </section>
          {
            query.length > 0
              ? (<SearchResults query={query} />)
              : (<SeriesList />)
          }

      </main>
    </div>
  )
}
