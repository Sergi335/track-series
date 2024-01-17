import Search from '@/components/Search'
import HomeTabs from '@/components/HomeTabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SeriesList from '@/components/SeriesList'
import SearchResults from '@/components/SearchResults'
import PopularSeries from '@/components/PopularSeries'

export default async function Home ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'

  return (
    <div className='app flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
      <header className='flex flex-col justify-end items-center min-h-[30rem] py-6 '>
          <h1 className="mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-[3rem] lg:text-[3.75rem] leading-[1.2]">Track My Series</h1>
          <section className='flex flex-wrap justify-center w-1/2'>
            <Search />
          </section>
      </header>
      <main className="flex flex-col">
        <HomeTabs query={query} page={page}>
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
          <TabsContent value="discover">
            <PopularSeries page={page}/>
          </TabsContent>
        </HomeTabs>
      </main>
    </div>
  )
}
