'use client'
import { useUserSeries } from '@/hooks/useUserSeries'
import { type MovieInfo } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'

// Ahora obtenemos los datos de Supabase en lugar de localStorage
export default function SeriesList ({ page }: { page: string }) {
  const { series, loading } = useUserSeries()
  const [slicedSeries, setSlicedSeries] = useState<MovieInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)

  // Ordenar las series: las completas al final (memoizado para evitar recálculos)
  const sortedSeries = useMemo(() => {
    return series.toSorted((a, b) => {
      const aComplete = a.complete ?? false
      const bComplete = b.complete ?? false

      if (aComplete === bComplete) return 0 // Si ambos son iguales, no cambia el orden
      if (aComplete) return 1 // Si a.complete es true, a va después de b
      if (bComplete) return -1 // Si b.complete es true, a va antes de b

      return 0 // Default value when the return value is undefined
    })
  }, [series])
  // console.log('🚀 ~ SeriesList ~ sortedSeries:', sortedSeries)

  useEffect(() => {
    setTotalPages(Math.ceil(sortedSeries.length / 20))
    const start = (Number(page) - 1) * 20
    const end = start + 20
    setSlicedSeries(sortedSeries.slice(start, end))
  }, [sortedSeries, page])

  if (loading) {
    return <h1 className="text-white">Cargando tus series...</h1>
  }

  return (
    <>
      {
        sortedSeries.length > 0
          ? (
            <>
              <MovieGrid series={slicedSeries} />
              {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </>
          )
          : <h1 className="text-white">No tienes series guardadas</h1>
      }
    </>
  )
}
