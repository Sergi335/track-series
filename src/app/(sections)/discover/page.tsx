import FilterComponent from '@/components/Filter'
import PopularSeries from '@/components/PopularSeries'

export default async function Discover ({ searchParams }: { searchParams?: Record<string, string> }) {
  // Construir los parámetros de la API de TMDB
  const params = new URLSearchParams()
  params.set('language', 'es-ES')
  params.set('page', searchParams?.page ?? '1')
  // Mapear filtros de la UI a los parámetros de la API
  if (typeof searchParams?.genre === 'string' && searchParams.genre.trim() !== '') params.set('with_genres', searchParams.genre)
  if (typeof searchParams?.language === 'string' && searchParams.language.trim() !== '') params.set('with_original_language', searchParams.language)
  if (typeof searchParams?.country === 'string' && searchParams.country.trim() !== '') params.set('with_origin_country', searchParams.country)
  if (typeof searchParams?.popularity_min === 'string' && searchParams.popularity_min.trim() !== '') params.set('vote_count.gte', searchParams.popularity_min)
  if (typeof searchParams?.popularity_max === 'string' && searchParams.popularity_max.trim() !== '') params.set('vote_count.lte', searchParams.popularity_max)
  if (typeof searchParams?.year === 'string' && searchParams.year.trim() !== '') params.set('first_air_date_year', `${searchParams.year}`)
  if (typeof searchParams?.network === 'string' && searchParams.network.trim() !== '') params.set('with_networks', searchParams.network)
  if (typeof searchParams?.status === 'string' && searchParams.status.trim() !== '') params.set('with_status', searchParams.status)
  if (typeof searchParams?.company === 'string' && searchParams.company.trim() !== '') params.set('with_companies', searchParams.company)

  const res = await fetch(`https://api.themoviedb.org/3/discover/tv?${params.toString()}`, {
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  })
  const data = await res.json()
  const results = Array.isArray(data.results) ? data.results : []
  const totalPages = typeof data.total_pages === 'number' && data.total_pages > 0 ? data.total_pages : 1

  return (
    <div className='app flex flex-col'>
      <main className="flex flex-col items-center">
        <FilterComponent />
        <PopularSeries results={results} totalPages={totalPages} />
      </main>
    </div>
  )
}
