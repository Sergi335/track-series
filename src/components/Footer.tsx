import Link from 'next/link'

export default function Footer () {
  return (
    <footer className="mt-16 w-full border-gray-800/50 bg-gradient-to-t from-black/50 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h3 className="mb-4 bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-2xl font-bold text-transparent">
            Track My Series
          </h3>
          <p className="mx-auto mb-8 max-w-md text-gray-400">
            Tu companero perfecto para descubrir, seguir y disfrutar de las mejores series de television.
          </p>

          <div className="mb-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <Link href="/aviso-legal" className="text-sm text-gray-500 transition-colors hover:text-white">
                Aviso legal
              </Link>
            </div>
            <div className="text-center">
              <Link href="/politica-de-privacidad" className="text-sm text-gray-500 transition-colors hover:text-white">
                Politica de privacidad
              </Link>
            </div>
            <div className="text-center">
              <Link href="/politica-de-cookies" className="text-sm text-gray-500 transition-colors hover:text-white">
                Politica de cookies
              </Link>
            </div>
          </div>

          <div className="border-gray-800/50 pt-8">
            <p className="text-sm text-gray-500">
              © 2024 Track My Series. Hecho con cariño para los amantes de las series.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
