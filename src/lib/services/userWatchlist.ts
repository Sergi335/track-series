import { supabase } from '@/lib/supabase'
import { MovieInfo } from '@/types'

export class UserWatchlistService {
  private userId: string | null | undefined

  constructor (userId: string | null | undefined) {
    this.userId = userId
  }

  // Obtener watchlist del usuario (reemplaza localStorage.getItem('watchlist'))
  async getUserWatchlist (): Promise<MovieInfo[]> {
    if (!this.userId) return []

    try {
      const { data, error } = await supabase
        .from('user_watchlist')
        .select('*')
        .eq('user_id', this.userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching watchlist:', error)
        return []
      }

      return data?.map(item => item.series_data) || []
    } catch (error) {
      console.error('Error in getUserWatchlist:', error)
      return []
    }
  }

  // Añadir a watchlist (reemplaza push al array de localStorage)
  async addToWatchlist (seriesData: MovieInfo): Promise<boolean> {
    if (!this.userId) return false

    try {
      // Primero quitar de series seguidas si está ahí
      await this.removeFromSeriesIfExists(seriesData.id)

      const { error } = await supabase
        .from('user_watchlist')
        .insert({
          user_id: this.userId,
          series_id: seriesData.id,
          series_data: seriesData
        })

      if (error) {
        console.error('Error adding to watchlist:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in addToWatchlist:', error)
      return false
    }
  }

  // Quitar de watchlist (reemplaza splice del array)
  async removeFromWatchlist (seriesId: number): Promise<boolean> {
    if (!this.userId) return false

    try {
      const { error } = await supabase
        .from('user_watchlist')
        .delete()
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)

      if (error) {
        console.error('Error removing from watchlist:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in removeFromWatchlist:', error)
      return false
    }
  }

  // Verificar si una serie está en la watchlist
  async isInWatchlist (seriesId: number): Promise<boolean> {
    if (!this.userId) return false

    try {
      const { data, error } = await supabase
        .from('user_watchlist')
        .select('id')
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)
        .single()

      return !error && !!data
    } catch (error) {
      return false
    }
  }

  // Método auxiliar para quitar de series seguidas
  private async removeFromSeriesIfExists (seriesId: number): Promise<void> {
    if (!this.userId) return

    try {
      await supabase
        .from('user_series')
        .delete()
        .eq('user_id', this.userId)
        .eq('series_id', seriesId)
    } catch (error) {
      // Silencioso, no es crítico si falla
      console.log('Note: Could not remove from series:', error)
    }
  }
}
