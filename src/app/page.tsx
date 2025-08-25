import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
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
    <div className='app flex flex-col min-h-screen'>
        <Header />
        <main className="flex flex-col items-center flex-1">
            {query.length > 0
              ? (<SearchResults query={query} page={page} />)
              : (
                  <>
                    <HomeButtons />
                    <FeaturesSection />
                  </>
                )
            }
        </main>
        <Footer />
    </div>
  )
}
