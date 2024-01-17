'use client'
import Link from 'next/link'
import { type MovieInfo } from '@/types'
import { useState, useEffect } from 'react'

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
  const showInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // e.stopPropagation()
    // const target = e.target as HTMLElement
    // const info = target.parentElement?.querySelector('div')
    // // console.log('🚀 ~ showInfo ~ info:', info)
    // if (info !== null && info !== undefined) {
    //   info?.classList.toggle('invisible')
    //   info?.classList.toggle('opacity-0')
    //   info?.classList.toggle('translate-y-[-120px]')
    // }
  }
  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-3/4'>
    {series.map(movie => {
      return (
        <div key={movie.id} className="flex flex-col" onMouseEnter={showInfo} onMouseLeave={showInfo}>
          <Link href={`/movies/${movie.id}`} className='flex flex-col'>
            <img className="rounded-2xl border-[5px] border-white shadow-xl" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`cover image for ${movie.name}`} />
          </Link>
              <div className="p-5 bg-[#ffffffbd] backdrop-blur-sm w-[calc(100%-9px)] mx-auto my-0 rounded-b-[10px] overflow-hidden invisible opacity-0 transition duration-300">
                <Link href={`/movies/${movie.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.name}</h5>
                </Link>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-6">{movie.overview}</p> */}
                    <Link href={`/movies/${movie.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>

      </div>
      )
    })}
  </section>
  )
}
