'use client'
// FilterComponent.tsx
import { useFilterMovies } from '@/hooks/useFilterMovies'
import { type FilterState, type Movies } from '@/types'
import React, { useState, type ChangeEvent } from 'react'

const currentYear = new Date().getFullYear()
const filterTypes = {
  genres: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((genre, index) => ({
    value: genre.toLowerCase(),
    label: genre
  })),
  countries: ['US', 'UK', 'Canada', 'Australia', 'Germany', 'JP'].map((country, index) => ({
    value: country,
    label: country
  })),
  popularity: [],
  networks: ['HBO', 'Netflix', 'Amazon Prime', 'Disney+', 'Hulu'].map((network, index) => ({
    value: network.toLowerCase(),
    label: network
  })),
  statuses: ['Returning', 'Ended', 'Canceled'].map((status, index) => ({
    value: status.toLowerCase(),
    label: status
  })),
  companies: []
}

const FilterComponent = ({ results, children }: { results: Movies[], children: (filteredMovies: Movies[]) => React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    genre: '',
    language: '',
    country: '',
    popularity_min: 0,
    popularity_max: 10000,
    year_min: 1950,
    year_max: currentYear,
    network: '',
    status: '',
    company: ''
  })
  const {
    genres,
    countries,
    networks,
    statuses,
    companies
  } = filterTypes
  //   useFilterMovies({ movies: [], activeFilters: filters })
  // Notificar al padre cada vez que los filtros cambien
  //   useEffect(() => {
  //     onFilterChange(filters)
  //   }, [filters, onFilterChange])
  const { filteredMovies } = useFilterMovies({ movies: results, activeFilters: filters })
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }))
  }

  const renderSelect = (name: keyof FilterState, label: string, options: typeof genres) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        id={name}
        value={filters[name]}
        onChange={handleChange}
        className="bg-gray-900 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Todos</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="p-4 rounded-lg shadow text-white mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-700   p-6 rounded-lg">

        {/* Filtro Género */}
        {renderSelect('genre', 'Género', genres)}

        {/* Filtro Idioma */}
        {renderSelect('language', 'Idioma', [{ value: 'es', label: 'Español' }, { value: 'en', label: 'Inglés' }])}

        {/* Filtro País */}
        {renderSelect('country', 'País', countries)}

        {/* Filtro Network */}
        {renderSelect('network', 'Network', networks)}

        {/* Filtro Compañías */}
        {renderSelect('company', 'Compañías', companies)}

        {/* Filtro Popularidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Popularidad</label>
          <div className="flex items-center space-x-2 mt-1">
            <input type="number" name="popularity_min" value={filters.popularity_min} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Min"/>
            <span className="text-gray-500">-</span>
            <input type="number" name="popularity_max" value={filters.popularity_max} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Max"/>
          </div>
        </div>

        {/* Filtro Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Año</label>
          <div className="flex items-center space-x-2 mt-1">
            <input type="number" name="year_min" value={filters.year_min} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Min"/>
            <span className="text-gray-500">-</span>
            <input type="number" name="year_max" value={filters.year_max} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Max"/>
          </div>
        </div>

        {/* Filtro Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="mt-2 flex items-center space-x-4">
            {statuses.map(status => (
              <div key={status.value} className="flex items-center">
                <input
                  id={`status-${status.value}`}
                  name="status"
                  type="radio"
                  value={status.value}
                  checked={filters.status === status.value}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 bg-gray-900"
                />
                <label htmlFor={`status-${status.value}`} className="ml-2 block text-sm text-gray-900">{status.label}</label>
              </div>
            ))}
          </div>
        </div>

      </div>
      {children(filteredMovies)}
    </div>
  )
}

export default FilterComponent
