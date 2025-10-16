'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { type MovieInfo } from '@/types'
import { useMemo } from 'react'
import MovieGrid from './MovieGrid'
import MovieGridLoader from './MovieGridLoader'
import Pagination from './Pagination'

export default function SeriesList ({ page }: { page: string }) {
  const { series, loading, initialized } = useUserSeriesStore()
  // const loading = true
  // Calcular todo en un solo useMemo para optimizar renders
  const { sortedSeries, slicedSeries, totalPages } = useMemo(() => {
    if (!series || series.length === 0) {
      return { sortedSeries: [], slicedSeries: [], totalPages: 0 }
    }

    const sorted = series.toSorted((a: MovieInfo, b: MovieInfo) => {
      const aComplete = a.complete ?? false
      const bComplete = b.complete ?? false

      if (aComplete === bComplete) return 0
      if (aComplete) return 1
      if (bComplete) return -1
      return 0
    })

    const start = (Number(page) - 1) * 20
    const end = start + 20
    const sliced = sorted.slice(start, end)
    const pages = Math.ceil(sorted.length / 20)

    return { sortedSeries: sorted, slicedSeries: sliced, totalPages: pages }
  }, [series, page])

  // Mostrar loader mientras loading es true
  if (loading || !initialized) {
    return <MovieGridLoader />
  }

  // Mostrar las series si hay
  if (sortedSeries.length > 0) {
    return (
      <>
        <MovieGrid series={slicedSeries} />
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </>
    )
  }

  // Solo mostrar el mensaje si loading es false y no hay series
  return <h1 className="text-white">No tienes series guardadas</h1>
}
