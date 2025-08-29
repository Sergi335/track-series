'use client'
import { genreItems } from '@/lib/utils'
import React from 'react'
import GenresCarrouselItem from './GenresCarrouselItem'
const GenresCarousel = () => {
  // Calcular el ancho total de un set completo de elementos
  const itemWidth = 240 + 16 // w-64 (256px) + mx-4 (32px total)
  const totalWidth = genreItems.length * itemWidth

  return (
    <section className="w-full py-16 my-16">
      <div className="w-full flex flex-col items-center justify-center p-8">
        {/* Contenedor principal del carrusel */}
        <div className="w-full overflow-hidden relative">
          {/* Gradientes para el efecto fade */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Contenedor de animación con ancho calculado */}
          <div
            className="flex animate-scroll-left"
            style={{
              width: `${(totalWidth * 2)}px`,
              '--scroll-distance': `-${totalWidth}px`
            } as React.CSSProperties & Record<string, string | number>}
          >
            {/* Primera copia de los elementos */}
            {genreItems.map((item) => (
              <GenresCarrouselItem
                key={item.genreSlug}
                backgroundImage={item.backgroundImage}
                genre={item.genre}
                genreSlogan={item.genreSlogan}
                genreSlug={item.genreSlug}
              />
            ))}

            {/* Segunda copia exacta para el efecto infinito */}
            {genreItems.map((item) => (
              <GenresCarrouselItem
                key={item.genreSlug}
                backgroundImage={item.backgroundImage}
                genre={item.genre}
                genreSlogan={item.genreSlogan}
                genreSlug={item.genreSlug}
              />
            ))}

            {/* Tercera copia para transición más suave */}
            {genreItems.slice(0, 2).map((item) => (
              <GenresCarrouselItem
                key={item.genreSlug}
                backgroundImage={item.backgroundImage}
                genre={item.genre}
                genreSlogan={item.genreSlogan}
                genreSlug={item.genreSlug}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--scroll-distance));
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
      </div>
    </section>
  )
}

export default GenresCarousel
