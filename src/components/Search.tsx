'use client'
import React, { useRef } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { CloseIcon } from './icons/icons'

export default function Search () {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // fetch(url, options)
    //   .then(async res => await res.json())
    //   .then(json => {
    //     console.log(json)
    //     setResults(json.results as Movies[])
    //   })
    //   .catch(err => { console.error('error:' + err) })
    // console.log(query)
  }
  const clearSearch = () => {
    replace(`${pathname}`)
    if (inputRef.current !== null) inputRef.current.value = ''
  }
  const handleSearch = useDebouncedCallback((term: string) => {
    // console.log(term)
    const params = new URLSearchParams(searchParams)
    if (term !== '') {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    params.set('page', '1')
    // setQuery(term)
    // console.log(params.toString())
    replace(`${pathname}?${params?.toString()}`)
  }, 500)

  return (
        <form className="flex w-full" onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer text-gray-500" onClick={clearSearch}>
                {
                  searchParams.toString().length > 0
                    ? <CloseIcon/>
                    : (
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                      )
                }
              </div>
              <input
                type="search"
                ref={inputRef}
                id="default-search"
                onChange={(e) => { handleSearch(e.target.value) }}
                className="block w-full p-4 ps-10 text-sm text-gray-500 border-2 border-gray-600 rounded-[12px] bg-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..."
                defaultValue={searchParams.get('query')?.toString()}
                required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
  )
}
