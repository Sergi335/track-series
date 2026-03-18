'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Provider } from '@/lib/providers'

interface AllProvidersSliderProps {
  providers: Provider[]
  providerName: string
}

export default function AllProvidersSlider ({ providers, providerName }: AllProvidersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1) // -1 for precision
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
      handleScroll() // Check initial state
      currentRef.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [providers])

  if (!providers || providers.length === 0) {
    return null
  }

  return (
    <section className="w-full max-w-6xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{providerName}</h2>
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 transition-opacity duration-300 disabled:opacity-0 disabled:cursor-not-allowed',
            { 'opacity-100': showLeftArrow }, { hidden: !showLeftArrow }
          )}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 no-scrollbar"
        >
          {providers.map((provider) => (
            provider.logo_path && (
              <Link href={`/discover?with_watch_providers=${provider.provider_id}`} key={provider.provider_id} className="w-[5rem] overflow-hidden rounded-[32px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                  alt={provider.provider_name}
                    // width={160}
                    // height={240}
                  className="object-cover h-full transform transition-transform duration-300 hover:scale-105"
                  />
                {/* <div className="w-40 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                </div> */}
              </Link>
            )
          ))}
        </div>

        {/* Right Arrow */}
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
