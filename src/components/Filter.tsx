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
import { FILTER_TYPES } from '@/lib/constants'
import { type FilterState } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, type ChangeEvent } from 'react'

const currentYear = new Date().getFullYear()

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

  const { genres, countries, networks, companies } = FILTER_TYPES

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

  const renderSelect = (name: keyof FilterState, label: string, options: Array<{ value: string, label: string }>) => {
    const isActive = filters[name] !== ''

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium">{label}</label>
        <Select
          value={filters[name] || 'Todos'}
          onValueChange={(value) => handleChange({ target: { name, value } } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger
            className={`w-[180px] rounded-[8px] transition-colors ${
              isActive
                ? 'border-blue-500 ring-1 ring-blue-500 ring-opacity-50'
                : ''
            }`}
          >
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
  }
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
