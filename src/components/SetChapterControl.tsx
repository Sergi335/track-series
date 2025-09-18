'use client'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import { type MovieInfo } from '@/types'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from './icons/icons'
import { Button } from './ui/button'

export default function SetChapterControl ({ data, isInList }: { data: MovieInfo, isInList?: boolean }) {
  const { user } = useUser()
  const { series, updateProgress } = useUserSeriesStore()
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0)
  const [editMode, setEditMode] = useState<boolean>(false)

  // Buscar la serie en los datos del usuario
  const movie = series.find(mov => mov.id === data.id)
  const { seasons, watched_season: storedSeason, watched_episode: storedEpisode, complete: storedComplete } = movie ?? { seasons: data.seasons || [], watched_season: 1, watched_episode: 1, complete: false }

  // Actualizar el número total de episodios cuando cambie la temporada seleccionada
  useEffect(() => {
    if (storedSeason && seasons.length > 0) {
      const seasonObj = seasons.find(s => s.season_number === storedSeason)
      setTotalEpisodes(seasonObj?.episode_count ?? 0)
    }
  }, [storedSeason, seasons])

  // Lógica para el botón de completar
  const handleComplete = async () => {
    const newComplete = !storedComplete

    // Buscar la última temporada real (ignorando especiales)
    const validSeasons = seasons.filter(s => s.season_number !== 0)
    const lastSeason = validSeasons[validSeasons.length - 1]
    const lastSeasonNumber = lastSeason?.season_number ?? storedSeason
    const lastEpisodeNumber = lastSeason?.episode_count ?? storedEpisode

    let newstoredSeason = storedSeason
    let newstoredEpisode = storedEpisode

    if (newComplete) {
      newstoredSeason = lastSeasonNumber
      newstoredEpisode = lastEpisodeNumber
    } else {
      newstoredSeason = Number(seasons[0]?.season_number) ?? 1
      newstoredEpisode = 1
    }

    if (user?.id) {
      await updateProgress(data.id, user.id, {
        watched_season: newstoredSeason,
        watched_episode: newstoredEpisode,
        complete: newComplete
      })
    }
  }

  // Guardar progreso manualmente desde los selects
  const saveProgress = async (newstoredSeason: number, newstoredEpisode: number) => {
    if (user?.id) {
      await updateProgress(data.id, user.id, {
        watched_season: newstoredSeason,
        watched_episode: newstoredEpisode,
        complete: storedComplete
      })
    }
  }

  // Cambiar temporada o episodio desde los selects
  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget
    let newStoredSeason: number
    let newStoredEpisode: number
    if (id === 'season') {
      newStoredSeason = Number(value)
      // Reset episodio al cambiar de temporada
      const seasonObj = seasons.find(s => s.season_number === Number(value))
      newStoredEpisode = 1
      setTotalEpisodes(seasonObj?.episode_count ?? 0)
      saveProgress(newStoredSeason, newStoredEpisode)
    } else if (id === 'chapters') {
      newStoredEpisode = Number(value)
      if (storedSeason !== undefined) {
        saveProgress(storedSeason, newStoredEpisode)
      }
    }
    // Guardar después de cambiar (con pequeño delay para asegurar el setState)

    // saveProgress(newStoredSeason, newStoredEpisode)
  }

  // Lógica para los botones de aumentar/disminuir episodio -> Debounce
  const increaseEpisode = async () => {
    if (
      typeof storedSeason === 'number' &&
      typeof storedEpisode === 'number' &&
      storedEpisode < totalEpisodes
    ) {
      saveProgress(storedSeason, storedEpisode + 1)
      return storedEpisode + 1
    } else if (
      typeof storedSeason === 'number' &&
      storedSeason < Math.max(...seasons.map(s => s.season_number))
    ) {
      // Pasar a la siguiente temporada si existe
      // Aquí podrías querer incrementar la temporada y poner episodio 1
      saveProgress(storedSeason + 1, 1)
      return storedSeason + 1
    }
  }

  const decreaseEpisode = async () => {
    if (
      typeof storedSeason === 'number' &&
      typeof storedEpisode === 'number' &&
      storedEpisode > 1
    ) {
      saveProgress(storedSeason, storedEpisode - 1)
      return storedEpisode - 1
    } else if (storedSeason !== undefined && storedSeason > Math.min(...seasons.map(s => s.season_number))) {
      // Volver a la temporada anterior si existe
      saveProgress(storedSeason - 1, 1)
      return storedSeason - 1
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
      <div className="flex gap-4 flex-wrap items-center">
        <form action="" className={`${formListClass}`}>
          <Button
            type="button"
            onClick={handleComplete}
            className={storedComplete ? 'bg-red-700 hover:bg-red-800 text-white transition-colors duration-500' : 'bg-blue-700 hover:bg-blue-800 transition-colors duration-500 text-white'}
          >
            {storedComplete ? 'Completada' : 'Completar'}
          </Button>
          {
            isInList !== null && isInList !== undefined && !isInList
              ? <Button type="button" className="bg-red-700 hover:bg-red-800 text-white transition-colors duration-500" onClick={() => { setEditMode(!editMode) }}>{editMode ? 'Save' : 'Edit'}</Button>
              : ''
          }

          {
            editMode
              ? (
                <>
                  <label className="text-white" htmlFor="season">Temporada:</label>
                  <select className="text-black" id="season" onChange={handleSelectChange} value={storedSeason}>
                    {
                      seasons.map(season => (
                        <option key={season.id} value={season.season_number}>{season.name}</option>
                      ))
                    }
                  </select>
                  <label className="text-white" htmlFor="chapters">Capítulo:</label>
                  <select className="text-black" id="chapters" onChange={handleSelectChange} value={storedEpisode}>
                    {
                      totalEpisodes !== undefined
                        ? Array.from({ length: totalEpisodes ?? 0 }, (_, i) => i + 1).map((chapter, index) => (
                          <option key={index} value={chapter}>{chapter}</option>
                        ))
                        : null
                    }
                  </select>
                </>
              )
              : (
                <>
                  <div className="flex gap-2 flex-wrap uppercase font-[700] tracking-[1.5px]">
                    <p className="text-white text-sm">{seasons.find(s => s.season_number === storedSeason)?.name}</p>
                    <p className="text-white text-sm">Capítulo: {storedEpisode}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={increaseEpisode} className="p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white">
                      <ChevronUp className="w-4 h-4"/>
                    </button>
                    <button type="button" onClick={decreaseEpisode} className="p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white">
                      <ChevronDown className="w-4 h-4"/>
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
