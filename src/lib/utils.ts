import { Movies } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FILTER_TYPES } from './constants'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}

export const genreItems = [
  {
    genre: 'Acción',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Acción')?.value}`,
    genreSlogan: 'Vive emociones fuertes y adrenalina sin límites.',
    backgroundImage: 'url(/genres/accion.jpg)'
  },
  {
    genre: 'Animación',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Animación')?.value}`,
    genreSlogan: 'Descubre mundos imaginarios y personajes entrañables.',
    backgroundImage: 'url(/genres/animacion.jpg)'
  },
  {
    genre: 'Comedia',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Comedia')?.value}`,
    genreSlogan: 'Ríe a carcajadas con historias divertidas y personajes únicos.',
    backgroundImage: 'url(/comedy.webp)'
  },
  {
    genre: 'Crimen',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Crimen')?.value}`,
    genreSlogan: 'Sumérgete en misterios y casos por resolver.',
    backgroundImage: 'url(/genres/crimen.jpg)'
  },
  {
    genre: 'Documental',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Documental')?.value}`,
    genreSlogan: 'Aprende y explora el mundo real con historias impactantes.',
    backgroundImage: 'url(/genres/documental.jpg)'
  },
  {
    genre: 'Drama',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Drama')?.value}`,
    genreSlogan: 'Emociones profundas y relatos conmovedores.',
    backgroundImage: 'url(/genres/drama.jpg)'
  },
  {
    genre: 'Familiar',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Familiar')?.value}`,
    genreSlogan: 'Entretenimiento para disfrutar en familia.',
    backgroundImage: 'url(/genres/familiar.jpg)'
  },
  {
    genre: 'Infantil',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Infantil')?.value}`,
    genreSlogan: 'Diversión y aprendizaje para los más pequeños.',
    backgroundImage: 'url(/genres/infantil.jpg)'
  },
  {
    genre: 'Misterio',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Misterio')?.value}`,
    genreSlogan: 'Descubre enigmas y secretos ocultos.',
    backgroundImage: 'url(/mystery.webp)'
  },
  {
    genre: 'Noticias',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Noticias')?.value}`,
    genreSlogan: 'Mantente informado con la actualidad del mundo.',
    backgroundImage: 'url(/genres/noticias.jpg)'
  },
  {
    genre: 'Reality',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Reality')?.value}`,
    genreSlogan: 'Historias reales y competencias emocionantes.',
    backgroundImage: 'url(/genres/reality.jpg)'
  },
  {
    genre: 'Ciencia ficción',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Ciencia ficción')?.value}`,
    genreSlogan: 'Explora futuros fascinantes y tecnologías extraordinarias.',
    backgroundImage: 'url(/scifi.webp)'
  },
  {
    genre: 'Telenovela',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Telenovela')?.value}`,
    genreSlogan: 'Dramas románticos y giros inesperados.',
    backgroundImage: 'url(/genres/telenovela.jpg)'
  },
  {
    genre: 'Talk Show',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Talk Show')?.value}`,
    genreSlogan: 'Conversaciones, entrevistas y entretenimiento en vivo.',
    backgroundImage: 'url(/genres/talk-show.jpg)'
  },
  {
    genre: 'Bélico/Política',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Bélico/Política')?.value}`,
    genreSlogan: 'Conflictos, historia y poder en la pantalla.',
    backgroundImage: 'url(/genres/belico-politica.jpg)'
  },
  {
    genre: 'Western',
    genreSlug: `/discover?genre=${FILTER_TYPES.genres.find(g => g.label === 'Western')?.value}`,
    genreSlogan: 'Aventuras en el lejano oeste y duelos legendarios.',
    backgroundImage: 'url(/genres/western.jpg)'
  }
]
export function searchInFiltered (movies: Movies[], query: string): Movies[] {
  if (query === '') return movies
  const q = query.toLowerCase()
  return movies.filter(
    m =>
      m.name?.toLowerCase().includes(q) ||
      m.original_name?.toLowerCase().includes(q) ||
      m.overview?.toLowerCase().includes(q)
  )
}
