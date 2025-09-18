'use client'
// Proveedores más famosos (top 20)
// FilterComponent.tsx
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type FilterState } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, type ChangeEvent } from 'react'

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
    // popularity_min: Number(searchParams.get('popularity_min') ?? 0),
    // popularity_max: Number(searchParams.get('popularity_max') ?? 100000),
    year: searchParams.get('year') ?? '',
    network: searchParams.get('network') ?? '',
    status: searchParams.get('status') ?? '',
    company: searchParams.get('company') ?? ''
  })

  const { genres, countries, networks, companies } = filterTypes

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value, type } = e.target
    if (value === 'Todos') {
      value = ''
    }
    const newFilters = {
      ...filters,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }
    setFilters(newFilters)

    // Empieza con los parámetros actuales
    const params = new URLSearchParams(searchParams.toString())
    // Actualiza solo el filtro cambiado
    if (value !== '') {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    // Opcional: resetear la página al cambiar filtro
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    // Reset estado local
    const resetState: FilterState = {
      genre: '',
      language: '',
      country: '',
      year: '',
      network: '',
      status: '',
      company: ''
    }
    setFilters(resetState)

    // Reset URL - solo mantener query y page si existen
    const params = new URLSearchParams()
    const currentQuery = searchParams.get('query')
    if (currentQuery) {
      params.set('query', currentQuery)
    }
    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  const renderSelect = (name: keyof FilterState, label: string, options: Array<{ value: string, label: string }>) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">{label}</label>
      <Select
        value={filters[name] || 'Todos'}
        onValueChange={(value) => handleChange({ target: { name, value } } as React.ChangeEvent<HTMLSelectElement>)}
      >
        <SelectTrigger className="w-[180px] rounded-[8px]">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectItem value={'Todos'}>{'Todos'}</SelectItem>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i).toReversed().map(year => (
    { value: year.toString(), label: year.toString() }
  ))

  // Verificar si hay filtros activos
  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6 rounded-lg">
        {renderSelect('genre', 'Género', genres)}
        {renderSelect('language', 'Idioma', [
          { value: 'es', label: 'Español' },
          { value: 'en', label: 'Inglés' }
        ])}
        {renderSelect('country', 'País', countries)}
        {renderSelect('network', 'Network', networks)}
        {renderSelect('company', 'Compañías', companies)}
        {renderSelect('year', 'Año', years)}

        {/* Botón de reset - solo se muestra si hay filtros activos */}
        {hasActiveFilters && (
          <div className="pt-4">
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterComponent
