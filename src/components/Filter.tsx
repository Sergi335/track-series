'use client'
// Proveedores más famosos (top 20)
// FilterComponent.tsx
import { type FilterState } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type ChangeEvent } from 'react'

const currentYear = new Date().getFullYear()
const filterTypes = {
  genres: [
    { value: '10759', label: 'Acción' },
    { value: '16', label: 'Animación' },
    { value: '35', label: 'Comedia' },
    { value: '80', label: 'Crimen' },
    { value: '99', label: 'Documental' },
    { value: '18', label: 'Drama' },
    { value: '10751', label: 'Familiar' },
    { value: '10762', label: 'Infantil' },
    { value: '9648', label: 'Misterio' },
    { value: '10763', label: 'Noticias' },
    { value: '10764', label: 'Reality' },
    { value: '10765', label: 'Ciencia ficción' },
    { value: '10766', label: 'Telenovela' },
    { value: '10767', label: 'Talk Show' },
    { value: '10768', label: 'Bélico/Política' },
    { value: '37', label: 'Western' }
  ],
  countries: [
    { value: 'US', label: 'Estados Unidos' },
    { value: 'GB', label: 'Reino Unido' },
    { value: 'JP', label: 'Japón' },
    { value: 'KR', label: 'Corea del Sur' },
    { value: 'CA', label: 'Canadá' },
    { value: 'DE', label: 'Alemania' },
    { value: 'FR', label: 'Francia' },
    { value: 'IT', label: 'Italia' },
    { value: 'ES', label: 'España' },
    { value: 'AU', label: 'Australia' },
    { value: 'CN', label: 'China' },
    { value: 'IN', label: 'India' },
    { value: 'RU', label: 'Rusia' },
    { value: 'MX', label: 'México' },
    { value: 'BR', label: 'Brasil' },
    { value: 'SE', label: 'Suecia' },
    { value: 'AR', label: 'Argentina' },
    { value: 'TR', label: 'Turquía' },
    { value: 'NL', label: 'Países Bajos' },
    { value: 'PL', label: 'Polonia' }
  ],
  networks: [
    { value: '8', label: 'Netflix' },
    { value: '9', label: 'Amazon Prime Video' },
    { value: '337', label: 'Disney Plus' },
    { value: '1899', label: 'HBO Max' },
    { value: '350', label: 'Apple TV+' },
    { value: '2241', label: 'Movistar Plus+' },
    { value: '63', label: 'Filmin' },
    { value: '62', label: 'Atres Player' },
    { value: '35', label: 'Rakuten TV' },
    { value: '3', label: 'Google Play Movies' },
    { value: '192', label: 'YouTube' },
    { value: '210', label: 'Sky' },
    { value: '531', label: 'Paramount Plus' },
    { value: '43', label: 'Starz' },
    { value: '80', label: 'AMC' },
    { value: '11', label: 'MUBI' },
    { value: '300', label: 'Pluto TV' },
    { value: '283', label: 'Crunchyroll' },
    { value: '541', label: 'rtve' },
    { value: '386', label: 'Peacock' }
  ],
  statuses: ['Returning', 'Ended', 'Canceled'].map(status => ({
    value: status.toLowerCase(),
    label: status
  })),
  companies: []
}

const FilterComponent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>({
    genre: searchParams.get('genre') ?? '',
    language: (searchParams.get('language') as '' | 'en' | 'es') ?? '',
    country: searchParams.get('country') ?? '',
    popularity_min: Number(searchParams.get('popularity_min') ?? 0),
    popularity_max: Number(searchParams.get('popularity_max') ?? 10000),
    year: searchParams.get('year') ?? '',
    network: searchParams.get('network') ?? '',
    status: searchParams.get('status') ?? '',
    company: searchParams.get('company') ?? ''
  })

  const { genres, countries, networks, statuses, companies } = filterTypes

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newFilters = {
      ...filters,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }
    setFilters(newFilters)
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== '' && val !== 0) params.set(key, String(val))
    })
    router.push(`?${params.toString()}`)
  }

  const renderSelect = (name: keyof FilterState, label: string, options: Array<{ value: string, label: string }>) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-700 p-6 rounded-lg">
        {renderSelect('genre', 'Género', genres)}
        {renderSelect('language', 'Idioma', [
          { value: 'es', label: 'Español' },
          { value: 'en', label: 'Inglés' }
        ])}
        {renderSelect('country', 'País', countries)}
        {renderSelect('network', 'Network', networks)}
        {renderSelect('company', 'Compañías', companies)}
        <div>
          <label className="block text-sm font-medium text-gray-700">Popularidad</label>
          <div className="flex items-center space-x-2 mt-1">
            <input type="number" name="popularity_min" value={filters.popularity_min} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Min"/>
            <span className="text-gray-500">-</span>
            <input type="number" name="popularity_max" value={filters.popularity_max} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900" placeholder="Max"/>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Año</label>
          <div className="mt-1">
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-900"
            >
              <option value="">Todos</option>
              {Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
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
    </div>
  )
}

export default FilterComponent
