import { cache } from 'react'

export interface Provider {
  display_priority: number
  logo_path: string
  provider_name: string
  provider_id: number
  display_priorities: Record<string, number>
}

export interface ProvidersResponse {
  results: Provider[]
}

export const getProviders = cache(async (): Promise<Provider[]> => {
  try {
    console.log('🔍 Fetching providers...')
    const response = await fetch(
      'https://api.themoviedb.org/3/watch/providers/tv?language=es-ES&watch_region=ES',
      {
        headers: {
          Authorization: process.env.AUTH ?? '',
          'Content-Type': 'application/json'
        }
        // next: { revalidate: 86400 } // Cache por 24 horas
      }
    )

    console.log('📡 Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Response not ok:', response.status, errorText)
      throw new Error('Error al cargar los proveedores')
    }

    const data: ProvidersResponse = await response.json()
    console.log('✅ Providers fetched:', data.results?.length || 0)

    // Ordenar por display_priority (menor número = mayor prioridad)
    const sortedProviders = data.results
      .filter(provider => provider.display_priorities.ES !== undefined)
      .sort((a, b) => a.display_priorities.ES - b.display_priorities.ES)

    console.log('📊 Filtered providers for ES:', sortedProviders.length)
    return sortedProviders
  } catch (err) {
    console.error('❌ Error fetching providers:', err)
    return []
  }
})
