'use client'
import Header from '@/components/Header'
import Search from '@/components/Search'
import { usePathname } from 'next/navigation'
import React from 'react'
export default function SectionsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  console.log('Params in layout:', pathname) // Verifica los parámetros aquí
  return (
    <>
      <Header />
      <main className="flex flex-col items-center mt-16">
        {
          pathname === '/discover' && (<h1 className="section_header">Discover</h1>)
        }
        {
          pathname === '/myseries' && (<h1 className="section_header">Mis Series</h1>)
        }
        {
          pathname === '/watchlist' && (<h1 className="section_header">Watchlist</h1>)
        }
        <Search />
        {children}
      </main>
    </>
  )
}
