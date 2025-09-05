'use client'
import { useUserSeries } from '@/hooks/useUserSeries'
import { type MovieInfo } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import MovieGrid from './MovieGrid'
import MovieGridLoader from './MovieGridLoader'
import Pagination from './Pagination'

export default function SeriesList ({ page }: { page: string }) {
  const { series, loading } = useUserSeries()
  const [slicedSeries, setSlicedSeries] = useState<MovieInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [localLoading, setLocalLoading] = useState(true)

  // Ordenar las series: las completas al final (memoizado para evitar recálculos)
  const sortedSeries = useMemo(() => {
    const safeSeries = series ?? []
    return safeSeries.toSorted((a, b) => {
      const aComplete = a.complete ?? false
      const bComplete = b.complete ?? false

      if (aComplete === bComplete) return 0
      if (aComplete) return 1
      if (bComplete) return -1
      return 0
    })
  }, [series])

  useEffect(() => {
    setTotalPages(Math.ceil(sortedSeries.length / 20))
    const start = (Number(page) - 1) * 20
    const end = start + 20
    setSlicedSeries(sortedSeries.slice(start, end))
    setTimeout(() => {
      setLocalLoading(false)
    }, 300)
  }, [sortedSeries, page])

  // Mostrar loader mientras loading es true
  if (loading || localLoading) {
    return <MovieGridLoader />
  }

  // Mostrar las series si hay
  if (sortedSeries.length > 0 && !localLoading && !loading) {
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
