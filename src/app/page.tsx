import Header from '@/components/Header'
import HomeButtons from '@/components/HomeButtons'
import SearchResults from '@/components/SearchResults'

export default function Home ({
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
            {query.length > 0
              ? (<SearchResults query={query} page={page} />)
              : <HomeButtons />
            }
        </main>
    </div>
  )
}
