'use client'
import { type MovieInfo } from '@/types'
import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'
import Pagination from './Pagination'

// Esto es CSR porque obtenemos los datos del localStorage
export default function SeriesList ({ page }: { page: string }) {
  const [series, setSeries] = useState<MovieInfo[]>([])
  const [slicedSeries, setSlicedSeries] = useState<MovieInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Your client-side code that uses window goes here
      if (window.localStorage.getItem('series') === null) window.localStorage.setItem('series', JSON.stringify([]))
      setSeries(JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? [])
    }
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(series.length / 20))
    const start = (Number(page) - 1) * 20
    const end = start + 20
    setSlicedSeries(series.slice(start, end))
  }, [series, page])

  console.log(series.length)

  return (
    <>
        {
            series.length > 0
              ? (
                  <>
                    <MovieGrid series={slicedSeries} />
                    {totalPages > 1 && <Pagination totalPages={totalPages} />}
                  </>
                )
              : <h1 className='text-white'>No series in your series</h1>
        }
    </>
  )
}
