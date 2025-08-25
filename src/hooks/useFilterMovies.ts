'use client'
import { type FilterState, type Movies } from '@/types'
import { useEffect, useState } from 'react'

export function useFilterMovies ({ movies, activeFilters }: { movies: Movies[], activeFilters: FilterState }) {
  console.log('🚀 ~ useFilterMovies ~ movies:', movies)
  //   const currentYear = new Date().getFullYear()
  // --- 1. GESTIÓN DE ESTADOS ---

  // Estado para la lista completa de películas, sin filtrar.
  const [allMovies, setAllMovies] = useState<Movies[]>([])
  // Estado para la lista de películas que se mostrará en pantalla (ya filtrada).
  const [filteredMovies, setFilteredMovies] = useState<Movies[]>([])
  console.log('🚀 ~ useFilterMovies ~ filteredMovies:', filteredMovies)
  // Estado para los criterios de filtro activos.
  //   const [activeFilters, setActiveFilters] = useState<FilterState>({
  //     genre: '',
  //     language: '',
  //     country: '',
  //     popularity_min: 0,
  //     popularity_max: 10000,
  //     year_min: 1950,
  //     year_max: currentYear,
  //     network: '',
  //     status: '',
  //     company: ''
  //   })

  // --- 2. OBTENCIÓN DE DATOS INICIALES ---

  // Simula la carga de datos desde la API cuando el componente se monta.
  useEffect(() => {
  // Aquí harías tu llamada fetch a la API.
  // fetch('https://api.example.com/Moviess')
  //   .then(res => res.json())
  //   .then(data => {
  //      setAllMoviess(data);
  //      setFilteredMovies(data); // Inicialmente, la lista filtrada es la lista completa.
  //   });
    console.log('render')

    // Usamos datos mock para el ejemplo:
    setAllMovies(movies)
    setFilteredMovies(movies)
  }, [movies]) // El array vacío [] asegura que esto solo se ejecute una vez.

  // --- 3. LÓGICA DE FILTRADO ---

  // Este efecto se ejecutará cada vez que 'activeFilters' o 'allMovies' cambien.
  useEffect(() => {
  // Si no hay películas, no hacemos nada.
    if (allMovies.length === 0) return
    console.log('Seguimos filtrando')

    // Empezamos con la lista completa.
    let results = [...allMovies]
    console.log('🚀 ~ useFilterMovies ~ results:', results)
    console.log('Ejemplo origin_country:', results[0]?.origin_country)

    // Aplicamos cada filtro uno por uno.
    // Filtro por Género
    if (activeFilters.genre !== undefined && activeFilters.genre !== null && activeFilters.genre !== '') {
      results = results.filter(movie => movie.genre_ids.includes(Number(activeFilters.genre)))
    }
    // Filtro por Idioma
    if (activeFilters.language !== undefined && activeFilters.language !== null && activeFilters.language !== '') {
      results = results.filter(movie => movie.original_language === activeFilters.language)
    }
    // Filtro por País
    const country = activeFilters.country
    console.log('🚀 ~ useFilterMovies ~ country:', country)
    console.log('Valor real de country:', country, typeof country)
    if (country !== undefined && country !== null && country !== '') {
      const countryNormalized = country.trim().toUpperCase()
      results = results.filter(
        movie =>
          Array.isArray(movie.origin_country) &&
          movie.origin_country.includes(countryNormalized)
      )
    }
    console.log('Filtro país:', country)
    console.log(results)

    // Filtro por Network
    const network = activeFilters.network
    if (network !== undefined && network !== null && network !== '') {
      results = results.filter(movie => movie.network_id === Number(network))
    }
    // Filtro por Compañía
    const company = activeFilters.company
    if (company !== undefined && company !== null && company !== '') {
      results = results.filter(movie => movie.company_ids?.includes(Number(company)))
    }
    // Filtro por Status
    const status = activeFilters.status
    if (status !== undefined && status !== null && status !== '') {
      results = results.filter(movie => movie.status === status)
    }
    // Filtro por Popularidad (rango)
    // const popularityMin = activeFilters.popularity_min
    // if (popularityMin !== undefined && popularityMin !== 0) {
    //   results = results.filter(movie => movie.popularity >= popularityMin)
    // }
    // const popularityMax = activeFilters.popularity_max
    // if (popularityMax !== undefined && popularityMax !== 0) {
    //   results = results.filter(movie => movie.popularity <= popularityMax)
    // }
    // // Filtro por Año (rango)
    // const yearMin = activeFilters.year_min
    // if (yearMin !== undefined && yearMin !== 0 && yearMin !== null) {
    //   results = results.filter(movie => new Date(movie.first_air_date).getFullYear() >= yearMin)
    // }
    // const yearMax = activeFilters.year_max
    // if (yearMax !== undefined && yearMax !== 0) {
    //   results = results.filter(movie => new Date(movie.first_air_date).getFullYear() <= yearMax)
    // }

    // Actualizamos el estado con los resultados filtrados.
    setFilteredMovies(results)
  }, [activeFilters, allMovies])

  return {
    filteredMovies
  }
}
