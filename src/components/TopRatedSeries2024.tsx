import { type Movies } from '@/types'
import TopRatedSeriesSlider from './TopRatedSeriesSlider'

interface ApiResponse {
  results: Movies[]
}

interface TopRatedSeries2024Props {
  title?: string
}

export default async function TopRatedSeries2024 ({ title = 'Últimos éxitos' }: TopRatedSeries2024Props) {
  let series: Movies[] = []

  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/tv?first_air_date_year=2024&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=popularity.desc&vote_average.gte=7&without_genres=16,10767',
      {
        headers: {
          Authorization: process.env.AUTH ?? '',
          'Content-Type': 'application/json'
        },
        next: {
          revalidate: 3600
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch top rated series for 2024')
    }

    const data: ApiResponse = await response.json()
    series = data.results
  } catch (error) {
    console.error(error)

    return (
      <section className="w-full max-w-6xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-neutral-400">No se pudieron cargar los títulos.</p>
      </section>
    )
  }

  return <TopRatedSeriesSlider series={series} title={title} />
}
