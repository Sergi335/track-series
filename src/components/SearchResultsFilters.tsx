import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { COUNTRY_MAP, COUNTRY_MAP_REVERSE, GENRE_MAP, GENRE_MAP_REVERSE } from '@/lib/constants'
import { Movies } from '@/types'
import React, { useMemo, useRef, useState } from 'react'

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

  // ✅ NUEVA FUNCIÓN: Renderizar Select con estilo condicional
  const renderSelect = (
    name: keyof typeof selected,
    label: string,
    options: string[],
    placeholder = 'Todos'
  ) => {
    const isActive = selected[name] !== '' && selected[name] !== 'Todos'

    return (
      <div className="flex justify-between items-center gap-4">
        <label className={`transition-colors ${isActive ? 'text-blue-400' : ''}`}>
          {label}
        </label>
        <Select
          value={selected[name] || placeholder}
          onValueChange={(value) => handleFilterChange({
            target: { name, value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger
            className={`w-[180px] rounded-[8px] transition-all duration-200 ${
              isActive
                ? 'border-blue-500 ring-1 ring-blue-500 ring-opacity-50'
                : ''
            }`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectItem value="Todos">Todos</SelectItem>
            {options.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

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

  // ✅ NUEVA FUNCIÓN: Limpiar todos los filtros
  const clearFilters = () => {
    setSelected({
      genre: '',
      country: '',
      year: ''
    })
    setResults(originalResultsRef.current)
  }

  // Verificar si hay algún filtro activo
  const hasActiveFilters = selected.genre !== '' || selected.country !== '' || selected.year !== ''

  return (
    <aside className="flex flex-col p-4 text-white rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2>Filtrar Resultados</h2>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white transition-colors"
          >
            Limpiar
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {renderSelect('genre', 'Género', genres)}
        {renderSelect('country', 'País', countries)}
        {renderSelect('year', 'Año', years)}
      </div>
    </aside>
  )
}
