'use client'
import FilterComponent from '@/components/Filter'
import Header from '@/components/Header'
import Search from '@/components/Search'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

export default function SectionsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  return (
    <>
      <Header />
      <main className="flex items-center">
        <aside className="w-1/6 h-[100dvh] bg-[#060a12] flex justify-end">
          {
            pathname === '/discover' && (<>
              <h1 className="section_header">Discover</h1>
              <div className="p-8 w-[325px] h-fit z-10 relative mt-44">
                {query.length === 0 && <FilterComponent />}
              </div>
            </>
            )
          }
          {
            pathname === '/myseries' && (<h1 className="section_header">Mis Series</h1>)
          }
          {
            pathname === '/watchlist' && (<h1 className="section_header">Watchlist</h1>)
        }

        </aside>
        <section className="w-2/4 h-[100dvh] p-8 ml-36">
          <Search />
          <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                autoHide: 'scroll',
                autoHideDelay: 500,
                theme: 'os-theme-light'
              }
            }}
            className="flex-1 max-h-[83dvh] overflow-y-auto pr-4"
          >
            {children}
          </OverlayScrollbarsComponent>
        </section>
      </main>
    </>
  )
}
