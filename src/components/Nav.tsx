'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Nav () {
  const pathname = usePathname()
  return (
    <nav className="p-4 flex justify-end items-center text-gray-700 dark:text-slate-200 w-full">
      <div className="flex justify-end items-center gap-2 p-1 rounded-lg lg:flex-row flex-col w-3/4 lg:w-auto">
        <Link className={`link ${pathname === '/' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/">Home</Link>
        <Link className={`link ${pathname === '/discover' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/discover">Discover</Link>

        {/* Protected links - only show when signed in */}
        <SignedIn>
          <Link className={`link ${pathname === '/myseries' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/myseries">My Series</Link>
          <Link className={`link ${pathname === '/watchlist' ? 'bg-blue-700' : ''} px-8 py-1 rounded-lg w-full lg:w-fit text-center hover:bg-blue-700 transition-colors duration-500`} href="/watchlist">Watchlist</Link>
        </SignedIn>

        <ThemeToggle />

        {/* Authentication buttons */}
        <SignedOut>
          <Link href="/sign-in">
            <button className="px-8 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-500">
              Sign In
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}
