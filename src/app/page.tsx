import SearchResults from '@/components/SearchResults'
import Search from '@/components/Search'
import SeriesList from '@/components/SeriesList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function Home ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  // console.log(searchParams)
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'
  // console.log(query.length)

  return (
    <div className='app flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
      <header className='flex flex-col justify-end items-center min-h-[30rem] py-6 '>
          <h1 className="mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-[3rem] lg:text-[3.75rem] leading-[1.2]">Track My Series</h1>
          <section className='flex flex-wrap justify-center w-1/2'>
            <Search />
          </section>
      </header>
      <main className="flex flex-col">
          {/* {
            query.length > 0 && <SearchResults query={query} page={page} />
              // ? (<SearchResults query={query} page={page} />)
              // : (<SeriesList />)
          } */}

      <Tabs defaultValue={'serieslist'} className="text-white flex flex-col items-center">
        <TabsList className='bg-slate-700 w-fit'>
          <TabsTrigger value="serieslist">Your Series</TabsTrigger>
          { query.length > 0 && <TabsTrigger value="search">Search</TabsTrigger> }
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="serieslist">
          <SeriesList />
        </TabsContent>
        {query.length > 0 && (
          <TabsContent value="search">
            <SearchResults query={query} page={page} />
          </TabsContent>
        )}
        <TabsContent value="discover">Discover</TabsContent>
      </Tabs>
      </main>
    </div>
  )
}
