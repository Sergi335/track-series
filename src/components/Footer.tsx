export default function Footer () {
  return (
    <footer className="w-full bg-gradient-to-t from-black/50 to-transparent border-t border-gray-800/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">
            Track My Series
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Tu compañero perfecto para descubrir, seguir y disfrutar de las mejores series de televisión.
          </p>

          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">1000+</div>
              <div className="text-sm text-gray-500">Series disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-400">3</div>
              <div className="text-sm text-gray-500">Géneros principales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-500">Entretenimiento</div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800/50">
            <p className="text-sm text-gray-500">
              © 2024 Track My Series. Hecho con ❤️ para los amantes de las series.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
