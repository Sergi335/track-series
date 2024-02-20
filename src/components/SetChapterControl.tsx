'use client'
import { type MovieInfo } from '@/types'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from './icons/icons'
import { Button } from './ui/button'

export default function SetChapterControl ({ data, isInList }: { data: MovieInfo, isInList?: boolean }) {
  const storedData = JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? {}
  const id = data.id
  const movie = storedData?.find(mov => mov.id === id)
  const { seasons, watched_season: storedSeason, watched_episode: storedEpisode, complete: storedComplete } = movie ?? { seasons: [], watched_season: undefined, watched_episode: undefined }
  const [episodeWatched, setEpisodeWatched] = useState<number>(storedEpisode ?? 1)
  const [seasonWatched, setSeasonWatched] = useState<number>(storedSeason ?? Number(seasons[0]?.season_number))
  const startingSeasonNumber = seasons[0]?.season_number === 0 ? 0 : 1
  const limitNumber = startingSeasonNumber === 0 ? 1 : 0
  const [totalEpisodes, setTotalEpisodes] = useState<number>(seasons[seasonWatched]?.episode_count)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(storedComplete ?? false)

  // En principio todos los botones del formulario ejecutan esta función
  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const series = JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? []
    const seriesIndex = series.findIndex((item: MovieInfo) => item.id === id)
    series[seriesIndex] = { ...series[seriesIndex], watched_season: seasonWatched, watched_episode: episodeWatched }
    window.localStorage.setItem('series', JSON.stringify(series))
    setEditMode(false)
  }

  const handleComplete = () => {
    setComplete(!complete)
    setSeasonWatched(seasons.length - limitNumber)
    setEpisodeWatched(seasons[seasons.length - 1].episode_count)
    const series = JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? [] // Accedemos dos veces al localStorage, ya esta en la variable storedData
    const seriesIndex = series.findIndex((item: MovieInfo) => item.id === id)
    series[seriesIndex] = { ...series[seriesIndex], complete: !complete }
    window.localStorage.setItem('series', JSON.stringify(series))
  }

  const getSeasonEpisodes = (e?: React.FormEvent<HTMLSelectElement>) => {
    e?.currentTarget?.id === 'season'
      ? setSeasonWatched(Number(e?.currentTarget?.value))
      : setEpisodeWatched(Number(e?.currentTarget?.value))
    if (e?.currentTarget?.id === 'season') {
      setTotalEpisodes(seasons[Number(e?.currentTarget?.value) - startingSeasonNumber].episode_count)
    }
  }

  useEffect(() => {
    setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber]?.episode_count)
  }, [seasons, startingSeasonNumber, seasonWatched])

  useEffect(() => {
    if (seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched) { // Si al clicar el boton esto no se cumple complete se pone a false
      setComplete(true)
    } else {
      setComplete(false)
    }
  }, [seasonWatched, episodeWatched, limitNumber, seasons, startingSeasonNumber])

  const increaseEpisode = () => {
    if (seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched) return
    if (seasonWatched !== undefined && episodeWatched !== undefined) {
      setEpisodeWatched((prevEpisode) => {
        return prevEpisode >= totalEpisodes ? 1 : prevEpisode + 1
      })
      setSeasonWatched(prevSeason => {
        return episodeWatched >= totalEpisodes ? prevSeason + 1 : prevSeason
      })
      setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber].episode_count)
    }
  }
  const decreaseEpisode = () => {
    if (seasonWatched === startingSeasonNumber && episodeWatched === 1) return
    if (seasonWatched !== undefined && episodeWatched !== undefined) {
      setEpisodeWatched((prevEpisode) => {
        return prevEpisode <= 1 ? totalEpisodes : prevEpisode - 1
      })
      setSeasonWatched(prevSeason => {
        return episodeWatched <= 1 ? prevSeason - 1 : prevSeason
      })
      setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber].episode_count)
    }
  }

  let formListClass
  if (isInList !== undefined && isInList) {
    formListClass = 'flex flex-col items-start gap-2'
  } else {
    formListClass = 'flex items-center gap-2'
  }
  return (
        <>
            <div className='flex gap-4 flex-wrap items-center'>
              <form action="" className={`${formListClass}`} onSubmit={saveData}>
                <Button onClick={() => { handleComplete() }} className={complete ? 'bg-red-600 hover:bg-red-400 text-white' : 'bg-blue-600 hover:bg-blue-400 text-white'}>{complete ? 'Completada' : 'Completar'}</Button>
                {
                  isInList !== null && isInList !== undefined && !isInList
                    ? <Button type='button' className='bg-red-600 hover:bg-red-400 text-white' onClick={() => { setEditMode(!editMode) }}>{editMode ? 'Cancel' : 'Edit'}</Button>
                    : ''
                }

                {
                    editMode
                      ? (
                          <>
                          { isInList !== null && isInList !== undefined && !isInList && <Button type='submit' className='bg-blue-600 hover:bg-blue-400 text-white'>Save</Button> }

                            <label className='text-white' htmlFor="season">Temporada:</label>
                            <select className='text-black' name="" id="season" onChange={getSeasonEpisodes} defaultValue={seasonWatched}>
                                {
                                    seasons.map(season => {
                                      return (
                                        <option key={season.id} value={season.season_number}>{season.season_number}</option>
                                      )
                                    })
                                }
                            </select>
                            <label className='text-white' htmlFor="chapters">Capítulo:</label>
                            <select className='text-black' name="" id="chapters" onChange={getSeasonEpisodes} defaultValue={episodeWatched}>
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
                          </>
                        )
                      : (
                        <>
                          <div className='flex gap-2 flex-wrap uppercase font-[700] tracking-[1.5px]'>
                              <p className='text-white text-sm'>Temporada: {seasonWatched}</p>
                              <p className='text-white text-sm'>Capítulo: {episodeWatched}</p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <button onClick={increaseEpisode} className='p-1 bg-blue-600 rounded-[3px]'>
                              <ChevronUp className='w-4 h-4'/>
                            </button>
                            <button onClick={decreaseEpisode} className='p-1 bg-blue-600 rounded-[3px]'>
                              <ChevronDown className='w-4 h-4'/>
                            </button>
                          </div>
                        </>
                        )
                }
              </form>
            </div>
        </>
  )
}
