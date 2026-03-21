'use client'

import type { Season } from '@/types'

interface SeasonsSectionProps {
  seasons: Season[]
}

export default function SeasonsSection ({ seasons }: SeasonsSectionProps) {
  if (!seasons || seasons.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col p-5">
      <h5 className="mb-2 text-sm font-medium text-white dark:text-white">Temporadas</h5>
      <div className="flex gap-2 flex-wrap">
        {seasons.map(season => {
          return (
            <div key={season.id}>
              <img
                className="h-[175px] w-[125px]"
                src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                width={186}
                height={260}
                alt={season.name}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  const fallbackText = (season.name ?? 'Sin título').split(' ').join('\n')
                  event.currentTarget.src = `https://placehold.co/186x260?text=${encodeURIComponent(fallbackText)}`
                }}
              />
              <p className="text-sm leading-normal text-white dark:text-gray-200">{season.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
