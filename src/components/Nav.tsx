'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav () {
  const pathname = usePathname()
  return (
        <nav className="p-4 flex justify-end items-center text-slate-200 w-full">
            <div className="flex justify-end items-center gap-2 p-1 rounded-lg lg:flex-row flex-col w-3/4 lg:w-auto">
                <Link className={`link ${pathname === '/' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/">Home</Link>
                <Link className={`link ${pathname === '/myseries' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/myseries">My Series</Link>
                <Link className={`link ${pathname === '/discover' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/discover">Discover</Link>
                <Link className={`link ${pathname === '/watchlist' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/watchlist">Watchlist</Link>
            </div>
        </nav>
  )
}
