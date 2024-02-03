'use client'
import { type MovieInfo } from '@/types'
import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'

export default function WatchList () {
  const [series, setSeries] = useState<MovieInfo[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Your client-side code that uses window goes here
      if (window.localStorage.getItem('watchlist') === null) window.localStorage.setItem('watchlist', JSON.stringify([]))
      setSeries(JSON.parse(window.localStorage.getItem('watchlist') ?? '') as MovieInfo[] ?? [])
    }
  }, [])

  return (
    <>
        {
            series.length > 0 ? <MovieGrid series={series} /> : <h1 className='text-white'>No series in watchlist</h1>
        }
    </>
  )
}
