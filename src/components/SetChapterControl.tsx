'use client'
import { type MovieInfo } from '@/types'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from './icons/icons'
import { Button } from './ui/button'

export default function SetChapterControl ({ data, isInList }: { data: MovieInfo, isInList?: boolean }) {
  // Recuperar la información del localStorage, buscarla de entre todas las series y recuperar la info que necesitamos
  const storedData = JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? {}
  const id = data.id
  const movie = storedData?.find(mov => mov.id === data.id)
  const { seasons, watched_season: storedSeason, watched_episode: storedEpisode, complete: storedComplete } = movie ?? { seasons: [], watched_season: undefined, watched_episode: undefined }
  // Declaramos los estados que vamos a necesitar
  const [episodeWatched, setEpisodeWatched] = useState<number>(storedEpisode ?? 1) // Ojo si no empieza en 1
  const [seasonWatched, setSeasonWatched] = useState<number>(storedSeason ?? Number(seasons[0]?.season_number))
  const [totalEpisodes, setTotalEpisodes] = useState<number>(seasons[seasonWatched]?.episode_count)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(storedComplete ?? false)
  // Variables auxiliares para el cálculo de episodios
  // Esto es por si una serie empieza en la temporada 0 que es especiales no cuente como una temporada normal
  const startingSeasonNumber = seasons[0]?.name === 'Especiales' ? 0 : 1 // tal vez deba ser season_number solo
  const limitNumber = startingSeasonNumber === 0 ? 1 : 0
  // console.log({ movie, seasons, limitNumber, startingSeasonNumber, seasonWatched, episodeWatched, seasonEpisodes: seasons[seasonWatched - startingSeasonNumber].episode_count, complete, totalEpisodes })

  // Guardar en localStorage los cambios en el estado de los episodios
  useEffect(() => {
    const series = JSON.parse(window.localStorage.getItem('series') ?? '') as MovieInfo[] ?? []
    const seriesIndex = series.findIndex((item: MovieInfo) => item.id === id)
    series[seriesIndex] = { ...series[seriesIndex], watched_season: seasonWatched, watched_episode: episodeWatched, complete }
    window.localStorage.setItem('series', JSON.stringify(series))
    const storeEvent = new Event('storageEvent')
    window.dispatchEvent(storeEvent)
  }, [complete, episodeWatched, id, seasonWatched])

  // Función para marcar la serie como completa
  const handleComplete = () => {
    setComplete(true)
    setSeasonWatched(seasons.length - limitNumber)
    setEpisodeWatched(seasons[seasons.length - 1].episode_count)
  }

  // Función para obtener los episodios de la temporada seleccionada en el select
  const getSeasonEpisodes = (e?: React.FormEvent<HTMLSelectElement>) => {
    e?.currentTarget?.id === 'season'
      ? setSeasonWatched(Number(e?.currentTarget?.value))
      : setEpisodeWatched(Number(e?.currentTarget?.value))
    if (e?.currentTarget?.id === 'season') {
      setTotalEpisodes(seasons[Number(e?.currentTarget?.value) - startingSeasonNumber].episode_count)
    }
  }

  // Actualizar el número total de episodios cuando se cambie de temporada
  useEffect(() => {
    setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber]?.episode_count)
    // console.log('Cambiando de temporada', totalEpisodes)
  }, [seasons, startingSeasonNumber, seasonWatched, totalEpisodes])

  // Actualizar el estado de la serie a completa si se llega al último episodio de la última temporada
  useEffect(() => {
    if (seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched) {
      setComplete(true)
    } else {
      setComplete(false)
    }
  }, [seasonWatched, episodeWatched, limitNumber, seasons, startingSeasonNumber])

  // Caso especial para cuando el episode_count de una temporada es 0
  const increaseEpisode = () => {
    // Si el número total de temporadas coincide con el número de temporada que estamos viendo más el limitNumber* y el número total de episodios de la temporada que es la última coincide con el episodio que estamos viendo, no aumentar el episodio
    if (seasons.length === seasonWatched + limitNumber && seasons[seasonWatched - startingSeasonNumber].episode_count === episodeWatched) return
    if (seasonWatched !== undefined && episodeWatched !== undefined) {
      setEpisodeWatched((prevEpisode) => {
        return prevEpisode >= totalEpisodes ? seasons[seasonWatched].episode_count === 0 ? 0 : 1 : prevEpisode + 1
      })
      setSeasonWatched(prevSeason => {
        return episodeWatched >= totalEpisodes ? prevSeason + 1 : prevSeason
      })
      // setTotalEpisodes(seasons[seasonWatched - startingSeasonNumber].episode_count)
    }
  }
  const getTotalEpisodes = () => {
    // console.log({ seasonWatched, seasons, season: seasons[seasonWatched - 1], episodeCount: seasons[0]?.episode_count })

    return seasons[seasonWatched - startingSeasonNumber - 1]?.episode_count
  }
  // No llega a calcular el total de episodios de la temporada anterior cuando se cambia de temporada, en el anterior pasa lo mismo pero no se nota porque se corrije en los sucesivos cambios
  const decreaseEpisode = () => {
    if (seasonWatched === startingSeasonNumber && episodeWatched === 1) return
    if (seasonWatched !== undefined && episodeWatched !== undefined) {
      setEpisodeWatched((prevEpisode) => {
        // console.log(getTotalEpisodes())
        return prevEpisode <= 1 ? getTotalEpisodes() : prevEpisode - 1 // todavia no ha cambiado la temporada luego totalEpisodes es el de la temporada anterior, hacer otra funcion getSeasonEpisodes para corregirlo y llamarla en totalEpisodes
      })
      setSeasonWatched(prevSeason => {
        // console.log(prevSeason)
        return episodeWatched <= 1 ? prevSeason - 1 : prevSeason
      })
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
              <form action="" className={`${formListClass}`}>
                <Button type='button' onClick={() => { handleComplete() }} className={complete ? 'bg-red-700 hover:bg-red-800 text-white transition-colors duration-500' : 'bg-blue-700 hover:bg-blue-800 transition-colors duration-500 text-white'}>{complete ? 'Completada' : 'Completar'}</Button>
                {
                  isInList !== null && isInList !== undefined && !isInList
                    ? <Button type='button' className='bg-red-700 hover:bg-red-800 text-white transition-colors duration-500' onClick={() => { setEditMode(!editMode) }}>{editMode ? 'Save' : 'Edit'}</Button>
                    : ''
                }

                {
                    editMode
                      ? (
                          <>
                          {/* { isInList !== null && isInList !== undefined && !isInList && <Button type='button' className='bg-blue-600 hover:bg-blue-400 text-white'>Save</Button> } */}

                            <label className='text-white' htmlFor="season">Temporada:</label>
                            <select className='text-black' name="" id="season" onChange={getSeasonEpisodes} defaultValue={seasonWatched}>
                                {
                                    seasons.map(season => {
                                      return (
                                        <option key={season.id} value={season.season_number}>{season.name}</option>
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
                              <p className='text-white text-sm'>{seasons[seasonWatched - startingSeasonNumber]?.name}</p>
                              <p className='text-white text-sm'>Capítulo: {episodeWatched}</p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <button type='button' onClick={increaseEpisode} className='p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white'>
                              <ChevronUp className='w-4 h-4'/>
                            </button>
                            <button type='button' onClick={decreaseEpisode} className='p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white'>
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
