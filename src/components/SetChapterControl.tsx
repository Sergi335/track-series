'use client'
import { toggleSerieComplete, updateSerieProgress } from '@/lib/actions'
import { type MovieInfo } from '@/types'
import React, { useEffect, useState, useTransition } from 'react'
import { ChevronDown, ChevronUp } from './icons/icons'
import { Button } from './ui/button'

export default function SetChapterControl ({ data, isInList }: { data: MovieInfo, isInList?: boolean }) {
  const { id, seasons, watched_season: storedSeason, watched_episode: storedEpisode, complete: storedComplete } = data

  const [episodeWatched, setEpisodeWatched] = useState<number>(storedEpisode ?? 1)
  const [seasonWatched, setSeasonWatched] = useState<number>(storedSeason ?? seasons[0]?.season_number ?? 1)
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(storedComplete ?? false)
  const [isPending, startTransition] = useTransition()

  const startingSeasonNumber = seasons.find(s => s.season_number > 0)?.season_number ?? 1
  const limitNumber = startingSeasonNumber === 0 ? 1 : 0

  useEffect(() => {
    if (seasons && seasons.length > 0) {
      const currentSeason = seasons.find(s => s.season_number === seasonWatched)
      setTotalEpisodes(currentSeason?.episode_count ?? 0)
    }
  }, [seasonWatched, seasons])

  useEffect(() => {
    // Debounce the update to avoid too many requests
    const handler = setTimeout(() => {
      if (storedEpisode !== episodeWatched || storedSeason !== seasonWatched) {
        startTransition(async () => {
          await updateSerieProgress(id, seasonWatched, episodeWatched)
        })
      }
    }, 1000) // 1 second debounce

    return () => {
      clearTimeout(handler)
    }
  }, [episodeWatched, seasonWatched, id, storedEpisode, storedSeason])

  useEffect(() => {
    if (storedComplete !== complete) {
      startTransition(async () => {
        await toggleSerieComplete(id, complete)
      })
    }
  }, [complete, id, storedComplete])

  const handleComplete = () => {
    const lastSeason = seasons[seasons.length - 1]
    setComplete(true)
    setSeasonWatched(lastSeason.season_number)
    setEpisodeWatched(lastSeason.episode_count)
  }

  const getSeasonEpisodes = (e?: React.FormEvent<HTMLSelectElement>) => {
    if (e?.currentTarget.id === 'season') {
      setSeasonWatched(Number(e.currentTarget.value))
    } else if (e?.currentTarget.id === 'chapters') {
      setEpisodeWatched(Number(e.currentTarget.value))
    }
  }

  useEffect(() => {
    if (seasons.length > 0) {
      const lastSeason = seasons[seasons.length - 1]
      if (seasonWatched === lastSeason.season_number && episodeWatched === lastSeason.episode_count) {
        setComplete(true)
      } else {
        setComplete(false)
      }
    }
  }, [seasonWatched, episodeWatched, seasons])

  const increaseEpisode = () => {
    if (complete) return
    const currentSeasonIndex = seasons.findIndex(s => s.season_number === seasonWatched)
    if (currentSeasonIndex === -1) return

    if (episodeWatched >= totalEpisodes) {
      const nextSeason = seasons[currentSeasonIndex + 1]
      if (nextSeason) {
        setSeasonWatched(nextSeason.season_number)
        setEpisodeWatched(1)
      }
    } else {
      setEpisodeWatched(prev => prev + 1)
    }
  }

  const decreaseEpisode = () => {
    if (seasonWatched === startingSeasonNumber && episodeWatched === 1) return
    if (episodeWatched <= 1) {
      const currentSeasonIndex = seasons.findIndex(s => s.season_number === seasonWatched)
      const prevSeason = seasons[currentSeasonIndex - 1]
      if (prevSeason) {
        setSeasonWatched(prevSeason.season_number)
        setEpisodeWatched(prevSeason.episode_count)
      }
    } else {
      setEpisodeWatched(prev => prev - 1)
    }
  }

  const formListClass = isInList ? 'flex flex-col items-start gap-2' : 'flex items-center gap-2'

  const currentSeasonName = seasons.find(s => s.season_number === seasonWatched)?.name ?? `Season ${seasonWatched}`

  return (
        <>
            <div className='flex gap-4 flex-wrap items-center'>
              <form action="" className={`${formListClass}`}>
                <Button type='button' onClick={handleComplete} disabled={isPending || complete} className={complete ? 'bg-red-700 hover:bg-red-800 text-white transition-colors duration-500' : 'bg-blue-700 hover:bg-blue-800 transition-colors duration-500 text-white'}>{complete ? 'Completed' : 'Complete'}</Button>
                {
                  !isInList &&
                    <Button type='button' className='bg-red-700 hover:bg-red-800 text-white transition-colors duration-500' onClick={() => { setEditMode(!editMode) }}>{editMode ? 'Save' : 'Edit'}</Button>
                }

                {
                    editMode
                      ? (
                          <>
                            <label className='text-white' htmlFor="season">Season:</label>
                            <select className='text-black' name="season" id="season" onChange={getSeasonEpisodes} value={seasonWatched}>
                                {
                                    seasons.map(season => (
                                        <option key={season.id} value={season.season_number}>{season.name}</option>
                                    ))
                                }
                            </select>
                            <label className='text-white' htmlFor="chapters">Episode:</label>
                            <select className='text-black' name="chapters" id="chapters" onChange={getSeasonEpisodes} value={episodeWatched}>
                                {
                                    Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((chapter) => (
                                        <option key={chapter} value={chapter}>{chapter}</option>
                                    ))
                                }
                            </select>
                          </>
                        )
                      : (
                        <>
                          <div className='flex gap-2 flex-wrap uppercase font-[700] tracking-[1.5px]'>
                              <p className='text-white text-sm'>{currentSeasonName}</p>
                              <p className='text-white text-sm'>Episode: {episodeWatched}</p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <button type='button' onClick={increaseEpisode} disabled={isPending || complete} className='p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white'>
                              <ChevronUp className='w-4 h-4'/>
                            </button>
                            <button type='button' onClick={decreaseEpisode} disabled={isPending} className='p-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-500 rounded-[3px] text-white'>
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
