import { type Movies } from '@/types'

let tmdbCache: Movies[] = []
let lastUpdate = 0
const CACHE_TTL = 1000 * 60 * 60 // 1 hora

async function fetchAllMovies (): Promise<Movies[]> {
  let allResults: Movies[] = []
  const MAX_PAGES = 100 // TMDB limita a 1000 resultados (20 x 50 páginas, pero algunas endpoints permiten 100 páginas)
  for (let i = 1; i <= MAX_PAGES; i++) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?language=es-ES&page=${i}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH ?? ''
      }
    })
    const data = await res.json()
    if (!Array.isArray(data.results) || data.results.length === 0) break
    allResults = allResults.concat(data.results as Movies[])
    // Si la API indica que ya no hay más páginas, salimos
    if (data.page >= data.total_pages) break
  }
  return allResults
}

export async function getAllMoviesFromCache (): Promise<Movies[]> {
  const now = Date.now()
  if (tmdbCache.length === 0 || now - lastUpdate > CACHE_TTL) {
    tmdbCache = await fetchAllMovies()
    lastUpdate = now
  }
  return tmdbCache
}
