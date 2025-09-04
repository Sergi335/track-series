import Header from '@/components/Header'
import Search from '@/components/Search'
import React from 'react'
export default function SectionsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Search />
      <main className="flex flex-col items-center">
        {children}
      </main>
    </>
  )
}
