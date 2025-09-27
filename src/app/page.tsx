import BrandsHome from '@/components/BrandsHome'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import GenresCarousel from '@/components/GenresCarrousel'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Search from '@/components/Search'
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
    <>
      <Header />
      <main className="flex flex-col items-center relative">
        <section className="mosaic w-full pb-14">
          <Hero />
          <BrandsHome />
          <Search />
        </section>
        {query.length > 0
          ? (<SearchResults query={query} page={page} />)
          : (
            <>
              <FeaturesSection />
              <GenresCarousel />
            </>
          )
        }
      </main>
      <Footer />
    </>
  )
}
