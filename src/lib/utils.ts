import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
    genreSlug: 'accion',
    genreSlogan: 'Vive emociones fuertes y adrenalina sin límites.',
    backgroundImage: 'url(/genres/accion.jpg)'
  },
  {
    genre: 'Animación',
    genreSlug: 'animacion',
    genreSlogan: 'Descubre mundos imaginarios y personajes entrañables.',
    backgroundImage: 'url(/genres/animacion.jpg)'
  },
  {
    genre: 'Comedia',
    genreSlug: '/featured/comedy',
    genreSlogan: 'Ríe a carcajadas con historias divertidas y personajes únicos.',
    backgroundImage: 'url(/comedy.webp)'
  },
  {
    genre: 'Crimen',
    genreSlug: 'crimen',
    genreSlogan: 'Sumérgete en misterios y casos por resolver.',
    backgroundImage: 'url(/genres/crimen.jpg)'
  },
  {
    genre: 'Documental',
    genreSlug: 'documental',
    genreSlogan: 'Aprende y explora el mundo real con historias impactantes.',
    backgroundImage: 'url(/genres/documental.jpg)'
  },
  {
    genre: 'Drama',
    genreSlug: 'drama',
    genreSlogan: 'Emociones profundas y relatos conmovedores.',
    backgroundImage: 'url(/genres/drama.jpg)'
  },
  {
    genre: 'Familiar',
    genreSlug: 'familiar',
    genreSlogan: 'Entretenimiento para disfrutar en familia.',
    backgroundImage: 'url(/genres/familiar.jpg)'
  },
  {
    genre: 'Infantil',
    genreSlug: 'infantil',
    genreSlogan: 'Diversión y aprendizaje para los más pequeños.',
    backgroundImage: 'url(/genres/infantil.jpg)'
  },
  {
    genre: 'Misterio',
    genreSlug: '/featured/mystery',
    genreSlogan: 'Descubre enigmas y secretos ocultos.',
    backgroundImage: 'url(/mystery.webp)'
  },
  {
    genre: 'Noticias',
    genreSlug: 'noticias',
    genreSlogan: 'Mantente informado con la actualidad del mundo.',
    backgroundImage: 'url(/genres/noticias.jpg)'
  },
  {
    genre: 'Reality',
    genreSlug: 'reality',
    genreSlogan: 'Historias reales y competencias emocionantes.',
    backgroundImage: 'url(/genres/reality.jpg)'
  },
  {
    genre: 'Ciencia ficción',
    genreSlug: '/featured/scifi',
    genreSlogan: 'Explora futuros fascinantes y tecnologías extraordinarias en sci-fi.',
    backgroundImage: 'url(/scifi.webp)'
  },
  {
    genre: 'Telenovela',
    genreSlug: 'telenovela',
    genreSlogan: 'Dramas románticos y giros inesperados.',
    backgroundImage: 'url(/genres/telenovela.jpg)'
  },
  {
    genre: 'Talk Show',
    genreSlug: 'talk-show',
    genreSlogan: 'Conversaciones, entrevistas y entretenimiento en vivo.',
    backgroundImage: 'url(/genres/talk-show.jpg)'
  },
  {
    genre: 'Bélico/Política',
    genreSlug: 'belico-politica',
    genreSlogan: 'Conflictos, historia y poder en la pantalla.',
    backgroundImage: 'url(/genres/belico-politica.jpg)'
  },
  {
    genre: 'Western',
    genreSlug: 'western',
    genreSlogan: 'Aventuras en el lejano oeste y duelos legendarios.',
    backgroundImage: 'url(/genres/western.jpg)'
  }
]
