export default function FeaturesSection () {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 my-32">
      {/* <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Por qué elegir Track My Series?
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Una experiencia completa para los amantes de las series de televisión
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-105">
          <div className="w-16 h-16 from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Búsqueda Avanzada</h3>
          <p className="text-gray-300 leading-relaxed">
            Encuentra exactamente lo que buscas con nuestra potente herramienta de búsqueda. Filtra por género, año, calificación y mucho más.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105">
          <div className="w-16 h-16 from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Lista Personal</h3>
          <p className="text-gray-300 leading-relaxed">
            Mantén un registro organizado de todas las series que has visto, las que estás viendo y las que planeas ver próximamente.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
          <div className="w-16 h-16 from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Recomendaciones</h3>
          <p className="text-gray-300 leading-relaxed">
            Descubre nuevas series basadas en tus gustos personales. Nuestro sistema te sugiere contenido que realmente te interesará.
          </p>
        </div>
      </div>
    </section>
  )
}
