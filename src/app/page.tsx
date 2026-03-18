import AllProvidersSlider from '@/components/AllProvidersSlider'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LatestByProvider from '@/components/LatestByProvider'
import Search from '@/components/Search'
import SearchResults from '@/components/SearchResults'
import TopRatedSeries2024 from '@/components/TopRatedSeries2024'
import { getProviders } from '@/lib/providers'

export default async function Home ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  } }) {
  const query = searchParams?.query ?? ''
  const page = searchParams?.page ?? '1'

  const providers = await getProviders()

  return (
    <>
      <Header />
      <main className="flex flex-col items-center relative">
        <section className="mosaic w-full pb-14 min-h-[30vh]">
          <Hero />
          <Search />
          {/* <BrandsHome /> */}
        </section>
        {query.length > 0
          ? (<SearchResults query={query} page={page} />)
          : (
            <>
              <FeaturesSection />
              <LatestByProvider providerId="337" providerName="Disney+" />
              <LatestByProvider providerId="8" providerName="Netflix" />
              {/* <GenresCarousel /> */}
              <AllProvidersSlider providers={providers} providerName="Todos los proveedores" />
              <TopRatedSeries2024 />
            </>
            )
        }
      </main>
      <Footer />
    </>
  )
}
