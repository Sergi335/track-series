import FilterComponent from '@/components/Filter'
import PopularSeries from '@/components/PopularSeries'
import SearchResults from '@/components/SearchResults'
import { type Movies } from '@/types'

export function searchInFiltered (movies: Movies[], query: string): Movies[] {
  if (query === '') return movies
  const q = query.toLowerCase()
  return movies.filter(
    m =>
      m.name?.toLowerCase().includes(q) ||
      m.original_name?.toLowerCase().includes(q) ||
      m.overview?.toLowerCase().includes(q)
  )
}

export default async function Discover ({ searchParams }: { searchParams?: Record<string, string> }) {
  // Construir los parámetros de la API de TMDB
  const params = new URLSearchParams()
  params.set('language', 'es-ES')
  params.set('page', searchParams?.page ?? '1')
  if (typeof searchParams?.genre === 'string' && searchParams.genre.trim() !== '') params.set('with_genres', searchParams.genre)
  if (typeof searchParams?.language === 'string' && searchParams.language.trim() !== '') params.set('with_original_language', searchParams.language)
  if (typeof searchParams?.country === 'string' && searchParams.country.trim() !== '') params.set('with_origin_country', searchParams.country)
  if (typeof searchParams?.year === 'string' && searchParams.year.trim() !== '') params.set('first_air_date_year', `${searchParams.year}`)
  if (typeof searchParams?.network === 'string' && searchParams.network.trim() !== '') params.set('with_networks', searchParams.network)
  if (typeof searchParams?.status === 'string' && searchParams.status.trim() !== '') params.set('with_status', searchParams.status)
  if (typeof searchParams?.company === 'string' && searchParams.company.trim() !== '') params.set('with_companies', searchParams.company)

  // Detectar si hay filtros activos (excluyendo query y page)
  const hasFilters = !!(
    (typeof searchParams?.genre === 'string' && searchParams.genre.trim() !== '') ||
    (typeof searchParams?.language === 'string' && searchParams.language.trim() !== '') ||
    (typeof searchParams?.country === 'string' && searchParams.country.trim() !== '') ||
    (typeof searchParams?.year === 'string' && searchParams.year.trim() !== '') ||
    (typeof searchParams?.network === 'string' && searchParams.network.trim() !== '') ||
    (typeof searchParams?.status === 'string' && searchParams.status.trim() !== '') ||
    (typeof searchParams?.company === 'string' && searchParams.company.trim() !== '')
  )

  let results: Movies[] = []
  let totalPages = 1

  if (hasFilters) {
    // Discover con filtros
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?${params.toString()}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH ?? ''
      }
    })
    const data = await res.json()
    results = Array.isArray(data.results) ? data.results : []
    totalPages = typeof data.total_pages === 'number' && data.total_pages > 0 ? data.total_pages : 1

    // Si hay búsqueda, filtra localmente
    if (typeof searchParams?.query === 'string' && searchParams.query.length > 0) {
      results = searchInFiltered(results, searchParams.query)
    }
  } else if (!hasFilters && !(typeof searchParams?.query === 'string' && searchParams.query.length > 0)) {
    // Sin filtros ni búsqueda: muestra discover por defecto
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?language=es-ES&page=${searchParams?.page ?? '1'}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH ?? ''
      }
    })
    const data = await res.json()
    results = Array.isArray(data.results) ? data.results : []
    totalPages = typeof data.total_pages === 'number' && data.total_pages > 0 ? data.total_pages : 1
  }

  return (
    <div className='app flex flex-col'>
      <main className="flex flex-col items-center">
        <FilterComponent />
        {typeof searchParams?.query === 'string' && searchParams.query.length > 0 && !hasFilters
          ? (
            // Solo búsqueda global, sin filtros
            <SearchResults query={searchParams?.query} page={searchParams?.page} />
            )
          : (
            // Filtros activos (con o sin búsqueda local)
            <PopularSeries results={results} totalPages={totalPages} />
            )}
      </main>
    </div>
  )
}
