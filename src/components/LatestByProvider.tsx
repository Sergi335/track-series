import { type Movies } from '@/types'
import ProviderSlider from './ProviderSlider'

interface LatestByProviderProps {
  providerId: string
  providerName: string
}

// Tipado para la respuesta de la API
interface ApiResponse {
  results: Movies[]
}

export default async function LatestByProvider ({ providerId, providerName }: LatestByProviderProps) {
  let series: Movies[] = []

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=first_air_date.desc&with_watch_providers=${providerId}&watch_region=ES`,
      {
        headers: {
          Authorization: process.env.AUTH ?? '',
          'Content-Type': 'application/json'
        },
        next: {
          revalidate: 3600 // Cache por 1 hora
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch latest series from provider')
    }

    const data: ApiResponse = await response.json()
    series = data.results
  } catch (error) {
    console.error(error)
    // Devuelve null o un mensaje de error si falla el fetch
    return (
      <section className="w-full max-w-6xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Últimos lanzamientos en {providerName}</h2>
        <p className="text-neutral-400">No se pudieron cargar los títulos.</p>
      </section>
    )
  }

  return <ProviderSlider series={series} providerName={providerName} />
}
