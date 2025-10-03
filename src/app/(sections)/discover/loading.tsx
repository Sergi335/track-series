import MovieGridLoader from '@/components/MovieGridLoader'

export default function Loading () {
  return (
    <section className="flex w-3/4 gap-8 mt-16">
      <div className="w-[180px]">
        {/* Espacio para el filtro */}
      </div>
      <div className="flex-1">
        <MovieGridLoader />
      </div>
    </section>
  )
}
