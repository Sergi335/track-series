'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { generatePagination } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination ({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = isNaN(Number(searchParams.get('page'))) || Number(searchParams.get('page')) === 0 ? 1 : Number(searchParams.get('page'))
  console.log(totalPages, currentPage, pathname) // cuando se pone a mano o se clica en un numero alto se pinta en el servidor tambien ?¿?

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex w-full py-14 justify-center">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={page.toString() + Math.random()} // original key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          )
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationNumber ({
  page,
  href,
  isActive,
  position
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm text-white',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 text-white': isActive,
      'hover:bg-blue-600 hover:text-white': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle'
    }
  )

  return isActive || position === 'middle'
    ? (
    <div className={className}>{page}</div>
      )
    : (
    <Link href={href} className={className}>
      {page}
    </Link>
      )
}

function PaginationArrow ({
  href,
  direction,
  isDisabled
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md text-white',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-blue-600 hover:text-white': !(isDisabled ?? false),
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right'
    }
  )

  const icon =
    direction === 'left'
      ? (
      <ArrowLeftIcon className="w-4" />
        )
      : (
      <ArrowRightIcon className="w-4" />
        )

  return (isDisabled ?? false)
    ? (
    <div className={className}>{icon}</div>
      )
    : (
    <Link className={className} href={href}>
      {icon}
    </Link>
      )
}
