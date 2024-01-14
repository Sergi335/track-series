import type { Movies } from '@/types'
import Link from 'next/link'
export default async function SearchResults ({ query }: { query: string }) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=es-ES&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzNhYTIzMmFjNzhkYmIxOGY2ODM4M2YxODBjZDQ0ZSIsInN1YiI6IjY0YzkyZTNlZjJjZjI1MDEzYWFjNWU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._o-bjsxI8MKyqvE2LYpzchOXYcFWtrTCFUazvSmr5OQ'
    }
  }
  const searchMovies = async () => {
    const res = await fetch(url, options)
    const json = await res.json()
    console.log(json)
    return json.results
  }
  const results: Movies[] = await searchMovies()
  return (
      <section className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-28 w-[1400px]'>
            {results.map(movie => {
              return (
                <div key={movie.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`/movies/${movie.id}`}>
                        <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                    </Link>
                    <div className="p-5">
                        <Link href={`/movies/${movie.id}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.name}</h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-6">{movie.overview}</p>
                        <Link href={`/movies/${movie.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                </div>
              )
            })}
          </section>
  )
}
