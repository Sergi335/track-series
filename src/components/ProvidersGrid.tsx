import { getProviders } from '@/lib/providers'
import Link from 'next/link'

export default async function ProvidersGrid () {
  const providers = await getProviders()

  if (providers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-500">No se pudieron cargar los proveedores</p>
      </div>
    )
  }

  return (
    <section className="max-w-6xl my-8 mx-auto">
      <h2 className="text-white text-2xl font-bold mb-6">Proveedores de Streaming</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {providers.map((provider) => (
          <Link
            key={provider.provider_id}
            href={`/discover?with_watch_providers=${provider.provider_id}`}
            className="group relative flex flex-col items-center p-4 rounded-lg"
          >
            <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-white text-xs text-center line-clamp-2">
              {provider.provider_name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
