'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseClient } from './supabase'
import type { MovieInfo, Movies } from '@/types'

// =================================================================================
// Series Actions
// =================================================================================

export async function getSeries () {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return []

  const { data, error } = await supabase
    .from('series')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching series:', error)
    return []
  }

  return data
}

export async function isSerieInList (serieId: number) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return false

  const { data, error } = await supabase
    .from('series')
    .select('id')
    .eq('id', serieId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
    console.error('Error checking series in list:', error)
    return false
  }

  return !!data
}

export async function addSerie (serie: MovieInfo) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase.from('series').insert({
    user_id: userId,
    id: serie.id,
    name: serie.name,
    poster_path: serie.poster_path
  })

  if (error) {
    console.error('Error adding serie:', error)
    return
  }

  revalidatePath('/myseries')
  revalidatePath(`/movies/${serie.id}`)
}

export async function removeSerie (serieId: number) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase
    .from('series')
    .delete()
    .eq('id', serieId)

  if (error) {
    console.error('Error removing serie:', error)
    return
  }

  revalidatePath('/myseries')
  revalidatePath(`/movies/${serieId}`)
}

export async function updateSerieProgress (serieId: number, season: number, episode: number) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase
    .from('series')
    .update({ watched_season: season, watched_episode: episode, complete: false })
    .eq('id', serieId)

  if (error) {
    console.error('Error updating serie progress:', error)
    return
  }

  revalidatePath('/myseries')
  revalidatePath(`/movies/${serieId}`)
}

export async function toggleSerieComplete (serieId: number, complete: boolean) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase
    .from('series')
    .update({ complete })
    .eq('id', serieId)

  if (error) {
    console.error('Error toggling serie complete:', error)
    return
  }

  revalidatePath('/myseries')
  revalidatePath(`/movies/${serieId}`)
}

// =================================================================================
// Watchlist Actions
// =================================================================================

export async function getWatchlist () {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return []

  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching watchlist:', error)
    return []
  }

  return data
}

export async function isMovieInWatchlist (movieId: number) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return false

  const { data, error } = await supabase
    .from('watchlist')
    .select('id')
    .eq('id', movieId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
    console.error('Error checking movie in watchlist:', error)
    return false
  }

  return !!data
}

export async function addMovieToWatchlist (movie: Movies) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase.from('watchlist').insert({
    user_id: userId,
    id: movie.id,
    name: movie.name,
    poster_path: movie.poster_path
  })

  if (error) {
    console.error('Error adding movie to watchlist:', error)
    return
  }

  revalidatePath('/watchlist')
  revalidatePath(`/movies/${movie.id}`)
}

export async function removeMovieFromWatchlist (movieId: number) {
  const { supabase, userId } = await createSupabaseClient()
  if (!supabase || !userId) return

  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('id', movieId)

  if (error) {
    console.error('Error removing movie from watchlist:', error)
    return
  }

  revalidatePath('/watchlist')
  revalidatePath(`/movies/${movieId}`)
}
