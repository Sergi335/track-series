'use client'

import { cn } from '@/lib/utils'
import { type Movies } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface TopRatedSeriesSliderProps {
  series: Movies[]
  title: string
}

export default function TopRatedSeriesSlider ({ series, title }: TopRatedSeriesSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const currentRef = scrollRef.current
    if (currentRef) {
      handleScroll()
      currentRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [series])

  if (!series || series.length === 0) {
    return null
  }

  return (
    <section className="w-full max-w-6xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 transition-opacity duration-300 disabled:opacity-0 disabled:cursor-not-allowed',
            { 'opacity-100': showLeftArrow }, { hidden: !showLeftArrow }
          )}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar"
        >
          {series.map((seriesItem) => (
            seriesItem.poster_path && (
              <Link href={`/movies/${seriesItem.id}`} key={seriesItem.id} className="flex-shrink-0 w-44 overflow-hidden rounded-[32px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${seriesItem.poster_path}`}
                  alt={seriesItem.name}
                  className="object-cover h-full transform transition-transform duration-300 hover:scale-105"
                />
              </Link>
            )
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 transition-opacity duration-300 disabled:opacity-0 disabled:cursor-not-allowed',
            { 'opacity-100': showRightArrow }, { hidden: !showRightArrow }
          )}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}
