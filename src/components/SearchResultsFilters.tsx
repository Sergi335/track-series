import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Movies } from '@/types'
import React, { useMemo, useRef, useState } from 'react'

// Diccionario de equivalencias id <-> nombre para géneros
const GENRE_MAP: Record<string, string> = {
  10759: 'Acción',
  16: 'Animación',
  35: 'Comedia',
  80: 'Crimen',
  99: 'Documental',
  18: 'Drama',
  10751: 'Familiar',
  10762: 'Infantil',
  9648: 'Misterio',
  10763: 'Noticias',
  10764: 'Reality',
  10765: 'Ciencia ficción',
  10766: 'Telenovela',
  10767: 'Talk Show',
  10768: 'Bélico/Política',
  37: 'Western'
}
const GENRE_MAP_REVERSE = Object.fromEntries(
  Object.entries(GENRE_MAP).map(([id, name]) => [name, id])
)

// Diccionario de equivalencias código <-> nombre para países (puedes ampliarlo)
const COUNTRY_MAP: Record<string, string> = {
  AR: 'Argentina',
  US: 'Estados Unidos',
  ES: 'España',
  MX: 'México',
  GB: 'Reino Unido',
  FR: 'Francia',
  IT: 'Italia',
  JP: 'Japón',
  KR: 'Corea del Sur',
  DE: 'Alemania',
  CA: 'Canadá',
  BR: 'Brasil',
  AU: 'Australia',
  CN: 'China',
  IN: 'India',
  RU: 'Rusia'
  // ...añade los que necesites
}
const COUNTRY_MAP_REVERSE = Object.fromEntries(
  Object.entries(COUNTRY_MAP).map(([code, name]) => [name, code])
)

export default function SearchResultsFilters ({
  results = [],
  setResults
}: { results?: Movies[], setResults: (results: Movies[]) => void }) {
  const originalResultsRef = useRef<Movies[]>(results)
  // Extraer valores únicos usando useMemo para optimizar
  const { genres, countries, years } = useMemo(() => {
    const genreSet = new Set<string>()
    const countrySet = new Set<string>()
    const yearSet = new Set<string>()

    results.forEach(movie => {
      if (Array.isArray(movie.genre_ids)) {
        movie.genre_ids.forEach(id => genreSet.add(String(id)))
      }
      if (Array.isArray(movie.origin_country)) {
        movie.origin_country.forEach(c => countrySet.add(c))
      }
      if (movie.first_air_date) {
        const year = String(movie.first_air_date).slice(0, 4)
        yearSet.add(year)
      }
    })

    // Solo géneros y países que tengan nombre en el diccionario
    const genreNames = Array.from(genreSet)
      .filter(id => GENRE_MAP[id])
      .map(id => GENRE_MAP[id])

    const countryNames = Array.from(countrySet)
      .filter(code => COUNTRY_MAP[code])
      .map(code => COUNTRY_MAP[code])

    return {
      genres: genreNames,
      countries: countryNames,
      years: Array.from(yearSet).sort((a, b) => Number(b) - Number(a))
    }
  }, [results])

  // Estado local para los filtros seleccionados
  const [selected, setSelected] = useState({
    genre: '',
    country: '',
    year: ''
  })

  // Handler para filtrar resultados
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newSelected = { ...selected, [name]: value }
    setSelected(newSelected)

    // Filtrar resultados originales
    let filtered = results
    if (newSelected.genre) {
      const genreId = GENRE_MAP_REVERSE[newSelected.genre] ?? newSelected.genre
      filtered = filtered.filter(movie =>
        Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(genreId))
      )
    }
    if (newSelected.genre === 'Todos') {
      setSelected({ ...newSelected, genre: '' })
      filtered = originalResultsRef.current
    }
    if (newSelected.country) {
      const countryCode = COUNTRY_MAP_REVERSE[newSelected.country] ?? newSelected.country
      filtered = filtered.filter(movie =>
        Array.isArray(movie.origin_country) && movie.origin_country.includes(countryCode)
      )
    }
    if (newSelected.country === 'Todos') {
      setSelected({ ...newSelected, country: '' })
      filtered = originalResultsRef.current
    }
    if (newSelected.year) {
      filtered = filtered.filter(movie =>
        movie.first_air_date && String(movie.first_air_date).startsWith(newSelected.year)
      )
    }
    if (newSelected.year === 'Todos') {
      setSelected({ ...newSelected, year: '' })
      filtered = originalResultsRef.current
    }
    setResults(filtered)
  }

  return (
    <aside className="flex flex-col p-4 text-white rounded-2xl">
      <h2>Filtrar Resultados</h2>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center gap-4">
          <label>Género</label>
          <Select onValueChange={(value) => handleFilterChange({ target: { name: 'genre', value } } as React.ChangeEvent<HTMLSelectElement>)}>
            <SelectTrigger className="w-[180px] rounded-[8px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="border-none">
              <SelectItem value={'Todos'}>{'Todos'}</SelectItem>
              {genres.map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>País</label>
          <Select onValueChange={(value) => handleFilterChange({ target: { name: 'country', value } } as React.ChangeEvent<HTMLSelectElement>)}>
            <SelectTrigger className="w-[180px] rounded-[8px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="border-none">
              <SelectItem value={'Todos'}>{'Todos'}</SelectItem>
              {countries.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>Año</label>
          <Select onValueChange={(value) => handleFilterChange({ target: { name: 'year', value } } as React.ChangeEvent<HTMLSelectElement>)}>
            <SelectTrigger className="w-[180px] rounded-[8px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="border-none">
              <SelectItem value={'Todos'}>{'Todos'}</SelectItem>
              {years.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  )
}
