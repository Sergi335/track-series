import { type MovieInfo } from '@/types'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function SetChapterControl ({ data }: { data: MovieInfo }) {
//   console.log(data)
  const { seasons, id, watched_season: storedSeason, watched_episode: storedEpisode } = data
  //   console.log(storedSeason, storedEpisode)

  const [episodeWatched, setEpisodeWatched] = useState<number>(storedEpisode ?? 1)
  const [seasonWatched, setSeasonWatched] = useState<number>(
    storedSeason ?? Number(seasons[0]?.season_number))
  const startingSeasonNumber = seasons[0]?.season_number === 0 ? 0 : 1
  const limitNumber = startingSeasonNumber === 0 ? 1 : 0
  const [totalEpisodes, setTotalEpisodes] = useState<number>(seasons[seasonWatched]?.episode_count)
  const [editMode, setEditMode] = useState<boolean>(false)
  //   console.log(seasonWatched, episodeWatched, totalEpisodes)
  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const series = JSON.parse(localStorage.getItem('series') ?? '') as MovieInfo[] ?? []
    const seriesIndex = series.findIndex((item: MovieInfo) => item.id === id)
    series[seriesIndex] = { ...series[seriesIndex], watched_season: seasonWatched, watched_episode: episodeWatched }
    console.log(series[seriesIndex])
    localStorage.setItem('series', JSON.stringify(series))
  }
  const getSeasonEpisodes = (e?: React.FormEvent<HTMLSelectElement>) => {
    console.log(e?.currentTarget?.id)
    e?.currentTarget?.id === 'season'
      ? setSeasonWatched(Number(e?.currentTarget?.value))
      : setEpisodeWatched(Number(e?.currentTarget?.value))
    if (e?.currentTarget?.id === 'season') {
      setTotalEpisodes(seasons[Number(e?.currentTarget?.value) - startingSeasonNumber].episode_count)
    }
  }
  useEffect(() => {
    setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber]?.episode_count)
  }, [seasonWatched])
  // Complete setComplete
  const increaseEpisode = () => {
    if (seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched) return
    if (seasonWatched !== undefined && episodeWatched !== undefined) {
      // const actualSeasonEpisodeCount = totalEpisodes
      setEpisodeWatched((prevEpisode) => {
        return prevEpisode >= totalEpisodes ? 1 : prevEpisode + 1
      })
      setSeasonWatched(prevSeason => {
        return episodeWatched >= totalEpisodes ? prevSeason + 1 : prevSeason
      })
      setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber].episode_count)
    }
    console.log(seasonWatched, episodeWatched, totalEpisodes, startingSeasonNumber, seasonWatched - startingSeasonNumber)
    console.log((seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched))
  }
  console.log('render')

  return (
        <>
            <div className='flex gap-4 flex-wrap'>
                {
                    editMode
                      ? (
                        <form action="" className='flex gap-2' onSubmit={saveData}>
                            <label className='text-white' htmlFor="season">Temporada:</label>
                            <select name="" id="season" onChange={getSeasonEpisodes} defaultValue={seasonWatched}>
                                {
                                    seasons.map(season => {
                                      return (
                                        <option key={season.id} value={season.season_number}>{season.season_number}</option>
                                      )
                                    })
                                }
                            </select>
                            <label className='text-white' htmlFor="chapters">Capítulo:</label>
                            <select name="" id="chapters" onChange={getSeasonEpisodes} defaultValue={episodeWatched}>
                                {
                                    totalEpisodes !== undefined
                                      ? Array.from({ length: totalEpisodes ?? 0 }, (_, i) => i + 1).map((chapter, index) => {
                                        return (
                                        <option key={index} value={chapter}>{chapter}</option>
                                        )
                                      })
                                      : null
                                }
                            </select>
                            <Button className='bg-blue-600 hover:bg-blue-400 text-white'>Save</Button>
                        </form>
                        )
                      : (
                        <div className='flex gap-2 flex-wrap'>
                            <p className='text-white'>Temporada: {seasonWatched}</p>
                            <p className='text-white'>Capítulo: {episodeWatched}</p>
                        </div>
                        )
                }

              <button onClick={increaseEpisode}>
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" fill="#9B4CFF"/><path fillRule="evenodd" clipRule="evenodd" d="M13 7a1 1 0 0 0-2 0v4H7a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4V7Z" fill="#9B4CFF"/></svg>
              </button>
              <button onClick={() => { setEditMode(!editMode) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#9B4CFF" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
              </button>
            </div>
        </>
  )
}
