'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { Skeleton } from './ui/skeleton'

export default function Nav () {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  return (
    <nav className="p-4 flex justify-end items-center text-gray-700 dark:text-slate-200 w-full">
      <div className="flex items-center gap-2 p-1 lg:flex-row flex-col text-sm">
        <Link className={`${pathname === '/' ? 'bg-blue-700 text-white' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-200 hover:text-white`} href="/">
          Inicio
        </Link>
        <Link className={`${pathname === '/discover' ? 'bg-blue-700 text-white' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-200 hover:text-white`} href="/discover">
          Descubrir
        </Link>
        {
          isLoaded
            ? (

                user
                  ? (
                    <>
                      <Link className={`${pathname === '/myseries' ? 'bg-blue-700 text-white' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-200 hover:text-white`} href="/myseries">Mis Series</Link>
                      <Link className={`${pathname === '/watchlist' ? 'bg-blue-700 text-white' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-200 hover:text-white`} href="/watchlist">Watchlist</Link></>
                    )
                  : null

              )
            : <>
              <Skeleton className="h-[32px] w-[134.88px] rounded-lg" />
              <Skeleton className="h-[32px] w-[128.3px] rounded-lg" />
            </>
        }
        <ThemeToggle />
        {
          isLoaded && !user
            ? (
              <>
                <Link className={'px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 hover:text-white transition-colors duration-200'} href="/sign-in">
                  Inicia Sesión
                </Link>
                <Link className={'px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 hover:text-white transition-colors duration-200'} href="/sign-up">
                  Regístrate
                </Link>
              </>
              )
            : null
        }

        {isLoaded
          ? (
              user ? <UserButton /> : null
            )
          : <Skeleton className="w-[28px] h-[28px] rounded-full" />}

      </div>
    </nav>
  )
}
