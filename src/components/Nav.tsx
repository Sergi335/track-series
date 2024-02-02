'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav () {
  const pathname = usePathname()
  return (
        <nav className="p-4 flex justify-center items-center text-slate-200 w-full">
            <div className="flex justify-end items-center gap-2">
                <Link className={`link ${pathname === '/' ? 'bg-slate-700' : ''} px-8 py-1 rounded-lg`} href="/">Home</Link>
                <Link className={`link ${pathname === '/myseries' ? 'bg-slate-700' : ''} px-8 py-1 rounded-lg`} href="/myseries">My Series</Link>
                <Link className={`link ${pathname === '/discover' ? 'bg-slate-700' : ''} px-8 py-1 rounded-lg`} href="/discover">Discover</Link>
                <Link className={`link ${pathname === '/watchlist' ? 'bg-slate-700' : ''} px-8 py-1 rounded-lg`} href="/watchlist">Watchlist</Link>
            </div>
        </nav>
  )
}
