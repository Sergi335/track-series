'use client'
import { Movies } from '@/types'
import { useEffect } from 'react'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'

export default function PopularSeries ({ results, totalPages }: { results: Movies[], totalPages: number }) {
  const LIMIT_API_RESULTS = 500

  // ✅ Scroll to top automático cuando cambian los resultados
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [results]) // Se ejecuta cada vez que cambian los resultados

  return (
    <>
      {/* <Filters /> */}
      {
        results.length > 0
          ? <>
            <MovieGrid series={results} />
            {totalPages > 1 && <Pagination totalPages={totalPages > LIMIT_API_RESULTS ? LIMIT_API_RESULTS : totalPages} />}
          </>
          : <h1 className="text-white">Error al recuperar los datos</h1>

      }
    </>
  )
}
