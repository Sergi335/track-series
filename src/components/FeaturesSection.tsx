import { NotepadText, Search } from 'lucide-react'
import Link from 'next/link'
import BrandsHome from './BrandsHome'
import { MagicCard } from './ui/magic-card'
import { Particles } from './ui/particles'
export default function FeaturesSection () {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mb-16 flex gap-9">
      <div className="h-[500px] w-full overflow-hidden absolute right-0 -z-20">
        <Particles />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 group">
        <MagicCard gradientColor={'var(--magic-gradient)'} className="p-[1px] rounded-2xl magic-card-content rotate-[-6deg] z-20 group-hover:rotate-0 group-hover:translate-x-0 translate-x-20">
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

        <MagicCard gradientColor={'var(--magic-gradient)'} className="p-[1px] rounded-2xl magic-card-content">
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
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-balance">
          Descubre series increíbles, mantén un registro de tus favoritas y encuentra tu próxima obsesión televisiva. Explora por géneros y nunca pierdas el hilo de lo que estás viendo.
        </p>
        <BrandsHome />
        <div className="flex gap-4 p-4 justify-center mt-16">
          <Link href="/sign-up" className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8 md:mt-0">
            Regístrate Gratis
          </Link>
        </div>
      </div>
    </section>
  )
}
