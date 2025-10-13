import { NotepadText, Search } from 'lucide-react'
import { MagicCard } from './ui/magic-card'
import { Particles } from './ui/particles'
export default function FeaturesSection () {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 mb-16">
      <div className="h-[500px] w-full overflow-hidden absolute right-0 -z-20">
        <Particles />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 group">
        <MagicCard gradientColor={'var(--magic-gradient)'} className="p-[1px] rounded-2xl magic-card-content rotate-[-6deg] z-20 hover:rotate-0">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-2 items-center">
              <Search className="w-6 h-6 text-gray-300" strokeWidth={1} />
              <h3 className="text-xl font-bold text-gray-300">Búsqueda Avanzada</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Encuentra exactamente lo que buscas con nuestra potente herramienta de búsqueda. Filtra por género, año, calificación y mucho más.
            </p>
            <img src="/img2.png" alt="" />
          </div>
        </MagicCard>

        <MagicCard gradientColor={'var(--magic-gradient)'} className="p-[1px] rounded-2xl magic-card-content relative left-[-34px]">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-2 items-center">
              <NotepadText className="w-6 h-6 text-gray-300" strokeWidth={1} />
              <h3 className="text-xl font-bold text-gray-300">Lista Personal</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Mantén un registro organizado de todas las series que has visto, las que estás viendo y las que planeas ver próximamente.
            </p>
            <img src="/img1.png" alt="" />
          </div>
        </MagicCard>

        {/* <MagicCard gradientColor={'var(--magic-gradient)'} className="p-[1px] rounded-lg bg-primary">
          <div>
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
        </MagicCard> */}
      </div>
      <div className="flex gap-4 p-4 justify-center mt-16">
        <button className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8 md:mt-0">
          Regístrate Gratis
        </button>
      </div>
    </section>
  )
}
