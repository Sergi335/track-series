import Link from 'next/link'

export default function HomeButtons () {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Explora por Géneros
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Sumérgete en mundos únicos. Cada género tiene su propia magia esperando a ser descubierta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <article className="group relative overflow-hidden bg-slate-700 text-white rounded-2xl w-full max-w-[400px] h-[240px] flex flex-col justify-end bg-cover bg-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                 style={{ backgroundImage: 'url(/scifi.webp)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 p-6">
            <h3 className="text-4xl md:text-5xl font-black italic text-white mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
              Sci Fi
            </h3>
            <p className="text-sm text-gray-200 mb-4 opacity-90">
              Explora futuros fascinantes y tecnologías extraordinarias
            </p>
            <Link href='/featured/scifi'
                  className='inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold text-white shadow-lg transform hover:translate-y-[-2px] hover:shadow-xl'>
              Explorar Sci Fi
            </Link>
          </div>
        </article>

        <article className="group relative overflow-hidden bg-slate-700 text-white rounded-2xl w-full max-w-[400px] h-[240px] flex flex-col justify-end bg-cover bg-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                 style={{ backgroundImage: 'url(/comedy.webp)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 p-6">
            <h3 className="text-4xl md:text-5xl font-black italic text-white mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
              Comedia
            </h3>
            <p className="text-sm text-gray-200 mb-4 opacity-90">
              Ríete sin parar con los mejores momentos cómicos
            </p>
            <Link href='/featured/comedy'
                  className='inline-block px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 font-semibold text-white shadow-lg transform hover:translate-y-[-2px] hover:shadow-xl'>
              Explorar Comedia
            </Link>
          </div>
        </article>

        <article className="group relative overflow-hidden bg-slate-700 text-white rounded-2xl w-full max-w-[400px] h-[240px] flex flex-col justify-end bg-cover bg-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl md:col-span-2 lg:col-span-1"
                 style={{ backgroundImage: 'url(/mystery.webp)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 p-6">
            <h3 className="text-4xl md:text-5xl font-black italic text-white mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
              Misterio
            </h3>
            <p className="text-sm text-gray-200 mb-4 opacity-90">
              Desentraña enigmas y vive la tensión del suspenso
            </p>
            <Link href='/featured/mystery'
                  className='inline-block px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold text-white shadow-lg transform hover:translate-y-[-2px] hover:shadow-xl'>
              Explorar Misterio
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
