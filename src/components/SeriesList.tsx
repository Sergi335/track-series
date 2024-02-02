'use client'
import { type MovieInfo } from '@/types'
import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'

// Esto es CSR porque obtenemos los datos del localStorage
export default function SeriesList () {
  const [series, setSeries] = useState<MovieInfo[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Your client-side code that uses window goes here
      if (window.localStorage.getItem('series') === null) window.localStorage.setItem('series', JSON.stringify([]))
      setSeries(JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? [])
    }
  }, [])

  return (
    <MovieGrid series={series} />
  )
}
