'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav () {
  const pathname = usePathname()
  return (
        <nav className="p-4 flex justify-center items-center text-slate-200 w-full">
            <div className="flex justify-end items-center gap-2 bg-slate-700 p-1 rounded-lg">
                <Link className={`link ${pathname === '/' ? 'bg-black' : ''} px-8 py-1 rounded-lg`} href="/">Home</Link>
                <Link className={`link ${pathname === '/myseries' ? 'bg-black' : ''} px-8 py-1 rounded-lg`} href="/myseries">My Series</Link>
                <Link className={`link ${pathname === '/discover' ? 'bg-black' : ''} px-8 py-1 rounded-lg`} href="/discover">Discover</Link>
                <Link className={`link ${pathname === '/watchlist' ? 'bg-black' : ''} px-8 py-1 rounded-lg`} href="/watchlist">Watchlist</Link>
            </div>
        </nav>
  )
}
