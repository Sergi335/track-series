import Link from 'next/link'
import type { ReactNode } from 'react'

interface LegalPageLayoutProps {
  title: string
  updatedAt: string
  children: ReactNode
}

export default function LegalPageLayout ({ title, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8">
          <Link href="/" className="w-fit text-sm text-sky-400 transition-colors hover:text-sky-300">
            Volver al inicio
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-3 text-sm text-gray-400">Ultima actualizacion: {updatedAt}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:mb-3 prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
          {children}
        </div>
      </section>
    </main>
  )
}
