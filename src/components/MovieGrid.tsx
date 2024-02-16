import { type MovieInfo, type Movies } from '@/types'
import Link from 'next/link'
import Controls from './Controls'

export default function MovieGrid ({ series }: { series: Movies[] | MovieInfo[] }) {
  return (
        <section className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-12 py-14 w-3/4'>
            {series === undefined && <h1 className='text-white'>No series in watchlist</h1>}
            {series?.map(movie => {
              return (
                <article key={movie.id} className="flex flex-col relative group">
                  <Link href={`/movies/${movie.id}`}>
                      <img className="rounded-2xl border-[5px] border-white shadow-xl aspect-[9/13] object-cover" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`cover image for ${movie.name}`} />
                  </Link>
                  <div className="absolute py-3 px-2 bg-[#1e293bd4] backdrop-blur-sm w-[calc(100%-9.6px)] ml-[4.8px] rounded-b-[8px] overflow-hidden invisible opacity-0 transition duration-300 bottom-[4.8px] group-hover:visible group-hover:opacity-100">
                    <Link className='flex' href={`/movies/${movie.id}`}>
                      <h5 className="mb-2 text-xl text-balance font-bold text-zinc-200">{movie.name}</h5>
                    </Link>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-6">{movie.overview}</p> */}
                    <Link href={`/movies/${movie.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </Link>
                    <Controls data={movie} isInList={true} />
                  </div>
                </article>
              )
            })}
        </section>
  )
}
