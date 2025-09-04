import { MovieInfo } from '@/types'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      user_series: {
        Row: {
          id: string
          user_id: string
          series_id: number
          series_data: MovieInfo
          watched_season: number
          watched_episode: number
          complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          series_id: number
          series_data: MovieInfo
          watched_season?: number
          watched_episode?: number
          complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          series_id?: number
          series_data?: MovieInfo
          watched_season?: number
          watched_episode?: number
          complete?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_watchlist: {
        Row: {
          id: string
          user_id: string
          series_id: number
          series_data: MovieInfo
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          series_id: number
          series_data: MovieInfo
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          series_id?: number
          series_data?: MovieInfo
          created_at?: string
        }
      }
    }
  }
}
