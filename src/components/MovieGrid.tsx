'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { type MovieInfo, type Movies } from '@/types'
import { useState } from 'react'
import Controls from './Controls'

export default function MovieGrid ({ series }: { series: Movies[] | MovieInfo[] }) {
  const { isFollowing, isInWatchlist, isComplete } = useUserSeriesStore()
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const handleItemClick = (movieId: number) => {
    document.startViewTransition(() => {
      setExpandedItem(expandedItem === movieId ? null : movieId)
    })
  }
  const COLUMN_COUNT = 5
  // const GRID_CLASS = `grid-cols-${COLUMN_COUNT + 1}`.toString()

  const getGridPosition = (index: number) => {
    const rowPosition = Math.floor(index / COLUMN_COUNT) // Qué fila (0, 1, 2...)
    const colPosition = index % COLUMN_COUNT // Posición en la fila (0, 1, 2, 3, 4)

    if (!series) return { gridColumn: '1', gridRow: '1' }

    // Encontrar el índice del elemento expandido
    const expandedIndex = series.findIndex(movie => movie.id === expandedItem)
    const expandedRowPosition = expandedIndex >= 0 ? Math.floor(expandedIndex / COLUMN_COUNT) : -1
    const expandedColPosition = expandedIndex >= 0 ? expandedIndex % COLUMN_COUNT : -1

    // Si estamos en la misma fila que el elemento expandido
    if (rowPosition === expandedRowPosition && expandedIndex >= 0) {
      const isCurrentExpanded = series[index].id === expandedItem

      if (isCurrentExpanded) {
        // El elemento expandido
        return {
          gridColumn: `${colPosition + 1} / ${colPosition + 3}`, // Ocupa 2 columnas
          gridRow: `${rowPosition + 1}`
        }
      } else if (colPosition > expandedColPosition) {
        // Elementos a la derecha del expandido se desplazan
        return {
          gridColumn: `${colPosition + 2}`, // Se desplaza +1 columna extra
          gridRow: `${rowPosition + 1}`
        }
      } else {
        // Elementos a la izquierda del expandido mantienen su posición
        return {
          gridColumn: `${colPosition + 1}`,
          gridRow: `${rowPosition + 1}`
        }
      }
    } else {
      // Filas sin elementos expandidos, posición normal
      return {
        gridColumn: `${colPosition + 1}`,
        gridRow: `${rowPosition + 1}`
      }
    }
  }

  return (
    <section className={'grid grid-cols-6 gap-4 mx-auto'}>
      {series === undefined && <h1 className="text-white">No series in watchlist</h1>}
      {series?.map((movie, index) => {
        const isExpanded = expandedItem === movie.id
        const position = getGridPosition(index)

        return (
          <article
            key={movie.id}
            className={`movieItem grid ${isExpanded ? 'grid-cols-2' : ''} relative transition-all duration-300 cursor-pointer gap-4`}
            style={{
              gridColumn: position.gridColumn,
              gridRow: position.gridRow
            }}

          >
            <div className={`flex relative w-full ${isFollowing(movie.id) && isComplete(movie.id) ? 'border-red-600' : isFollowing(movie.id) ? 'border-blue-600' : isInWatchlist(movie.id) ? 'border-green-600' : 'border-transparent'} border-2 rounded-[32px]`}>
              {/* ImageCard */}
              <div className="rounded-[32px] overflow-hidden">
                <img
                  className={'rounded-[32px] shadow-xl object-cover transition-all duration-300 w-full h-full'}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`cover image for ${movie.name}`}
                  onClick={() => handleItemClick(movie.id)}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    const fallbackText = (movie.name ?? 'Sin título').split(' ').join('\n')
                    event.currentTarget.src = `https://placehold.co/400x600?text=${encodeURIComponent(fallbackText)}`
                  }}
                />
              </div>

              {/* ✅ Info expandida - solo aparece cuando está expandido */}
            </div>
            {isExpanded && (
              <div className="flex flex-col p-2 animate-slide-right">
                <div>
                  <h3 className="text-white font-bold text-base mb-0">{movie.name}</h3>
                  <div className="flex gap-2">
                    <p className="text-gray-400 text-sm mt-0">{String(movie.first_air_date).slice(0, 4)}</p>
                    <p className="text-gray-400 text-sm">Rating: ⭐ {movie.vote_average?.toFixed(1)}</p>
                  </div>
                  <p className="text-gray-300 text-sm mt-3 line-clamp-4">{movie.overview}</p>
                </div>
                <Controls data={movie} isInList={true} />
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}
