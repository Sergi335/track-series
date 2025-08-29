import Link from 'next/link'
export default function GenresCarrouselItem ({ backgroundImage, genre, genreSlogan, genreSlug }: { backgroundImage: string, genre: string, genreSlogan: string, genreSlug: string }) {
  return (
    <article className="group bg-slate-700 text-white flex flex-col justify-end bg-cover bg-center transition-all duration-300 hover:scale-105 hover:shadow-2xl aspect-[9/16] mx-2 w-[240px] min-h-96 flex-shrink-0"
      style={{ backgroundImage }}>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div> */}
      <div className="relative flex flex-col p-4">
        <h3 className="text-2xl font-black text-white mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px] text-ellipsis overflow-hidden whitespace-nowrap">
          {genre}
        </h3>
        <p className="text-sm text-gray-200 mb-4 opacity-90">
          {genreSlogan}
        </p>
        <Link href={`${genreSlug}`}
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold text-white shadow-lg transform hover:translate-y-[-2px] hover:shadow-xl text-ellipsis overflow-hidden whitespace-nowrap text-center">
          Explorar {genre}
        </Link>
      </div>
    </article>
  )
}
