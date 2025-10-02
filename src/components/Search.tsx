'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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
    const params = new URLSearchParams(searchParams.toString())
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
    <section className="flex flex-wrap justify-center w-full flex-grow items-center">
      <form className="flex w-[500px]" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-5 cursor-pointer text-gray-600 dark:text-gray-400" onClick={clearSearch}>

            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>

          </div>
          <input
            type="search"
            ref={inputRef}
            id="default-search"
            onChange={(e) => { handleSearch(e.target.value) }}
            autoComplete="off"
            className="block w-full p-4 ps-11 text-sm text-gray-900 border-2 border-gray-300 rounded-full bg-white
          focus:ring-blue-500 focus:border-blue-500
          dark:bg-black dark:border-[#21262d] dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500 dark:focus-visible:border-blue-500 dark:focus:border-blue-500
          focus-visible:ring-1 focus-visible:ring-blue-500
          outline-none autofill:bg-gray-900 autofill:text-white
          autofill:shadow-[inset_0_0_0px_1000px_#0a1120]
          autofill:border-blue-500
          focus:autofill:bg-gray-900  [:-webkit-autofill]{color:white!important}"
            placeholder="Busca una serie..."
            defaultValue={searchParams.get('query')?.toString()}
            required />
          {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
        </div>
      </form>
    </section>
  )
}
