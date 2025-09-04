import { ActorInfo } from '@/components/ActorInfo'
import Controls from '@/components/Controls'
import HistoryBackButton from '@/components/HistoryBackButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import type { Credits, MovieInfo } from '@/types'

export default async function MoviePage ({ params }: { params: { id: string } }) {
  const { id } = params
  const dataurl = `https://api.themoviedb.org/3/tv/${id}?language=es-ES`
  const creditsurl = `https://api.themoviedb.org/3/tv/${id}/credits?language=es-ES`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  // promise.all
  const fetchMovieInfo = async () => {
    const res = await fetch(dataurl, options)
    const json = await res.json()
    console.log(json)
    return json
  }
  const fetchCastInfo = async () => {
    const res = await fetch(creditsurl, options)
    const json = await res.json()
    console.log(json)
    return json
  }
  const credits: Credits = await fetchCastInfo()
  const data: MovieInfo = await fetchMovieInfo() // coger de localStorage si ya está guardado
  console.log(data.first_air_date.split('-')[0])
  return (
    <>
      <main className="bg-cover bg-fixed" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
        <div className="mainContent min-h-screen">
          <section className="sidebar h-full py-12 px-8">
            <div className="flex flex-col sm:flex-row 2xl:flex-col items-center gap-6 flex-wrap">
              <img className="aspect-[2/3] object-cover max-w-[150px] 2xl:max-w-[100%]" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="" />
              <div className="p-5 flex items-center gap-4">
                {data.networks.map(network => {
                  return (
                    <div key={network.id}>
                      <img className="w-[126px] bg-[#ffffffd6] p-2 2xl:bg-transparent" src={`https://image.tmdb.org/t/p/w500/${network.logo_path}`} alt="" />
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {
                  data.production_companies.map(company => (company.logo_path !== null ? <img key={company.id} className="w-[90px] object-contain bg-[#ffffffd6] p-2 2xl:bg-transparent" src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt="" /> : null))
                }
              </div>
            </div>
          </section>
          <section className="mainSection flex flex-col md:px-8">
            <header className="flex flex-col items-start justify-center mt-16 px-5 gap-4 uppercase font-extrabold text-white dark:text-white text-4xl md:text-5xl lg:text-8xl header opacity-65 text-balance">
              <HistoryBackButton />
              <h1>{data.name}</h1>
            </header>
            <section className="h-full">
              <div className="">
                <div className="flex gap-4 px-5 items-center flex-wrap">
                  {
                    data.created_by.map(creator => {
                      return (
                        <p key={creator.id} className="text-sm leading-normal text-slate-200 font-bold dark:text-gray-200">{creator.name}</p>
                      )
                    })
                  }
                  <p className="text-sm leading-normal text-white dark:text-gray-200">{data.first_air_date?.split('-')[0]} - {data.last_air_date?.split('-')[0]}</p>
                  {data.genres.map(genre => {
                    return (
                      <p key={genre.id} className="text-sm leading-normal text-white dark:text-gray-200">{genre.name}</p>
                    )
                  })}
                  <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.578 22.038h4.672c.327 0 .601-.11.822-.33.221-.222.332-.496.332-.823v-5.77c0-.326-.11-.6-.33-.822a1.121 1.121 0 0 0-.824-.331h-3.519c-.327 0-.601.11-.822.33a1.121 1.121 0 0 0-.332.824v2.306c0 .328.11.601.33.822.223.223.497.334.824.334h3.345v2.134h-4.5l.002 1.326Zm1.325-4.616v-2.306h3.175v2.306h-3.175Zm6.376 4.616h1.327v-3.547l3.432 3.547h1.818l-3.953-4.095 3.953-3.981h-1.761l-3.49 3.49v-3.49h-1.328l.002 8.076Zm7.817-1.21h1.154v-2.25h2.25v-1.155h-2.25v-2.25h-1.155v2.25h-2.25v1.155h2.25l.002 2.25ZM8.422 30c-.69 0-1.266-.231-1.728-.693-.463-.463-.694-1.04-.694-1.73V8.422c0-.69.231-1.266.694-1.728C7.157 6.231 7.732 6 8.422 6h19.155c.69 0 1.266.231 1.728.694.463.463.695 1.038.695 1.728v19.155c0 .69-.231 1.266-.693 1.728-.463.463-1.04.695-1.73.695H8.422Z" fill="#2563eb"/></svg>
                  <p className="text-white">{data.popularity}</p>
                  <p className="text-white">{data.vote_average} / {data.vote_count}</p>
                  {
                    data.in_production
                      ? <p className="text-white bg-blue-600 text-xs py-1 px-2 rounded-lg">En producción</p>
                      : <p className="text-white bg-red-600 text-xs py-1 px-2 rounded-lg">Finalizada</p>
                  }
                </div>
                <div className="p-5 lg:w-2/4 leading-6">
                  <p className="text-sm leading-6 text-slate-200 dark:text-gray-200 text-pretty">{data.overview}</p>
                </div>
                <Controls data={data} isInList={false}/>
                <div className="flex flex-col p-5">
                  <h5 className="mb-2 text-sm font-medium text-white dark:text-white">Reparto</h5>
                  <div className="flex flex-wrap gap-2">
                    {credits.cast.map(actor => {
                      return (
                        <HoverCard key={actor.id}>
                          <HoverCardTrigger>
                            <Avatar className="w-20 h-20">
                              <AvatarImage src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} className="object-cover cursor-pointer"/>
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-black text-white">
                            <ActorInfo actor={actor} />
                          </HoverCardContent>
                        </HoverCard>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col p-5">
                  <h5 className="mb-2 text-sm font-medium text-white dark:text-white">Temporadas</h5>
                  <div className="flex gap-2 flex-wrap">
                    {data.seasons.map(season => {
                      return (
                        <div className="" key={season.id}>
                          <img className="w-[125px] h-[175px]" src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} width={186} height={260} alt="" />
                          <p className="text-sm leading-normal text-white dark:text-gray-200">{season.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  )
}
