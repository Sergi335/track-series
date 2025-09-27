import { supabase } from '@/lib/supabase'
import { MovieInfo } from '@/types'

export class UserSeriesService {
  private userId: string | null | undefined

  constructor (userId: string | null | undefined) {
    this.userId = userId
  }

  // Obtener series del usuario (reemplaza localStorage.getItem('series'))
  async getUserSeries (): Promise<MovieInfo[]> {
    if (!this.userId) return []

    try {
      const { data, error } = await supabase
        .from('user_series')
        .select('*')
        .eq('user_id', this.userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching series:', error)
        return []
      }

      return data?.map(item => ({
        ...item.series_data,
        watched_season: item.watched_season,
        watched_episode: item.watched_episode,
        complete: item.complete
      })) || []
    } catch (error) {
      console.error('Error in getUserSeries:', error)
      return []
    }
  }

  // Seguir serie (reemplaza push al array de localStorage)
  async followSeries (seriesData: MovieInfo): Promise<boolean> {
    if (!this.userId) return false

    try {
      // Primero quitar de watchlist si está ahí
      // await this.removeFromWatchlistIfExists(seriesData.id)

      const { error } = await supabase
        .from('user_series')
        .insert({
          user_id: this.userId,
          series_id: seriesData.id,
          series_data: seriesData,
          watched_season: seriesData.watched_season || 1,
          watched_episode: seriesData.watched_episode || 1,
          complete: seriesData.complete || false
        })

      if (error) {
        console.error('Error following series:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in followSeries:', error)
      return false
    }
  }

  // Dejar de seguir serie (reemplaza splice del array)
  async unfollowSeries (seriesId: number): Promise<boolean> {
    if (!this.userId) return false

    try {
      const { error } = await supabase
        .from('user_series')
        .delete()
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)

      if (error) {
        console.error('Error unfollowing series:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in unfollowSeries:', error)
      return false
    }
  }

  // Actualizar progreso (reemplaza el useEffect de SetChapterControl)
  async updateProgress (seriesId: number, updates: {
    watched_season?: number
    watched_episode?: number
    complete?: boolean
  }): Promise<boolean> {
    if (!this.userId) return false

    try {
      const { error } = await supabase
        .from('user_series')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)

      if (error) {
        console.error('Error updating progress:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in updateProgress:', error)
      return false
    }
  }

  // Verificar si una serie está siendo seguida
  async isFollowing (seriesId: number): Promise<boolean> {
    if (!this.userId) return false

    try {
      const { data, error } = await supabase
        .from('user_series')
        .select('id')
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)
        .single()

      return !error && !!data
    } catch (error) {
      return false
    }
  }

  // Método auxiliar para quitar de watchlist
  private async removeFromWatchlistIfExists (seriesId: number): Promise<void> {
    if (!this.userId) return

    try {
      await supabase
        .from('user_watchlist')
        .delete()
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)
    } catch (error) {
      // Silencioso, no es crítico si falla
      console.log('Note: Could not remove from watchlist:', error)
    }
  }
}
