import { UserSeriesService } from '@/lib/services/userSeries'
import { UserWatchlistService } from '@/lib/services/userWatchlist'
import { MovieInfo } from '@/types'
import { create } from 'zustand'

interface UserSeriesState {
  series: MovieInfo[]
  watchlist: MovieInfo[]
  loading: boolean
  initialized: boolean
  currentUserId: string | null

  // Actions para series
  initializeUser: (userId: string) => Promise<void>
  followSeries: (seriesData: MovieInfo, userId: string) => Promise<boolean>
  unfollowSeries: (seriesId: number, userId: string) => Promise<boolean>
  updateProgress: (seriesId: number, userId: string, updates: {
    watched_season?: number
    watched_episode?: number
    complete?: boolean
  }) => Promise<boolean>

  // Actions para watchlist
  addToWatchlist: (seriesData: MovieInfo, userId: string) => Promise<boolean>
  removeFromWatchlist: (seriesId: number, userId: string) => Promise<boolean>

  // Utilidades
  clearUserData: () => void
  isFollowing: (seriesId: number) => boolean
  isInWatchlist: (seriesId: number) => boolean
}

export const useUserSeriesStore = create<UserSeriesState>((set, get) => ({
  series: [],
  watchlist: [],
  loading: false,
  initialized: false,
  currentUserId: null,

  initializeUser: async (userId: string) => {
    const { initialized, currentUserId } = get()

    // Si ya está inicializado para este usuario, no hacer nada
    if (initialized && currentUserId === userId) {
      console.log('🔄 Usuario ya inicializado:', userId)
      return
    }

    console.log('🚀 Inicializando datos para usuario:', userId)
    set({ loading: true, currentUserId: userId })

    try {
      const seriesService = new UserSeriesService(userId)
      const watchlistService = new UserWatchlistService(userId)

      // Cargar series y watchlist en paralelo
      const [userSeries, userWatchlist] = await Promise.all([
        seriesService.getUserSeries(),
        watchlistService.getUserWatchlist()
      ])

      console.log('✅ Datos cargados desde Supabase:', userSeries.length, 'series +', userWatchlist.length, 'watchlist')
      set({
        series: userSeries,
        watchlist: userWatchlist,
        loading: false,
        initialized: true
      })
    } catch (error) {
      console.error('❌ Error inicializando datos del usuario:', error)
      set({
        series: [],
        watchlist: [],
        loading: false,
        initialized: true
      })
    }
  },

  followSeries: async (seriesData: MovieInfo, userId: string) => {
    const { series } = get()

    try {
      console.log('➕ Siguiendo serie:', seriesData.name)
      const seriesService = new UserSeriesService(userId)
      const watchlistService = new UserWatchlistService(userId)

      // Remover de watchlist y agregar a series
      await watchlistService.removeFromWatchlist(seriesData.id)
      const success = await seriesService.followSeries(seriesData)

      if (success) {
        // Actualizar estado local optimísticamente
        const exists = series.some(s => s.id === seriesData.id)
        if (!exists) {
          set({ series: [...series, seriesData] })
          console.log('✅ Serie añadida al estado local')
        }
      }

      return success
    } catch (error) {
      console.error('❌ Error siguiendo serie:', error)
      return false
    }
  },

  unfollowSeries: async (seriesId: number, userId: string) => {
    const { series } = get()

    try {
      console.log('🗑️ Dejando de seguir serie:', seriesId)
      const seriesService = new UserSeriesService(userId)
      const success = await seriesService.unfollowSeries(seriesId)

      if (success) {
        // Actualizar estado local optimísticamente
        const newSeries = series.filter(s => s.id !== seriesId)
        set({ series: newSeries })
        console.log('✅ Serie removida del estado local. Series restantes:', newSeries.length)
      }

      return success
    } catch (error) {
      console.error('❌ Error dejando de seguir serie:', error)
      return false
    }
  },

  updateProgress: async (seriesId: number, userId: string, updates) => {
    const { series } = get()

    try {
      console.log('📝 Actualizando progreso serie:', seriesId, updates)
      const seriesService = new UserSeriesService(userId)
      const success = await seriesService.updateProgress(seriesId, updates)

      if (success) {
        // Actualizar estado local optimísticamente
        const updatedSeries = series.map(s =>
          s.id === seriesId
            ? { ...s, ...updates }
            : s
        )
        set({ series: updatedSeries })
        console.log('✅ Progreso actualizado en estado local')
      }

      return success
    } catch (error) {
      console.error('❌ Error actualizando progreso:', error)
      return false
    }
  },

  addToWatchlist: async (seriesData: MovieInfo, userId: string) => {
    const { watchlist } = get()

    try {
      console.log('➕ Añadiendo a watchlist:', seriesData.name)
      const watchlistService = new UserWatchlistService(userId)
      const success = await watchlistService.addToWatchlist(seriesData)

      if (success) {
        // Actualizar estado local optimísticamente
        const exists = watchlist.some(s => s.id === seriesData.id)
        if (!exists) {
          set({ watchlist: [...watchlist, seriesData] })
          console.log('✅ Serie añadida a watchlist local')
        }
      }

      return success
    } catch (error) {
      console.error('❌ Error añadiendo a watchlist:', error)
      return false
    }
  },

  removeFromWatchlist: async (seriesId: number, userId: string) => {
    const { watchlist } = get()

    try {
      console.log('🗑️ Removiendo de watchlist:', seriesId)
      const watchlistService = new UserWatchlistService(userId)
      const success = await watchlistService.removeFromWatchlist(seriesId)

      if (success) {
        // Actualizar estado local optimísticamente
        const newWatchlist = watchlist.filter(s => s.id !== seriesId)
        set({ watchlist: newWatchlist })
        console.log('✅ Serie removida de watchlist local. Restantes:', newWatchlist.length)
      }

      return success
    } catch (error) {
      console.error('❌ Error removiendo de watchlist:', error)
      return false
    }
  },

  clearUserData: () => {
    console.log('🧹 Limpiando datos del usuario')
    set({
      series: [],
      watchlist: [],
      loading: false,
      initialized: false,
      currentUserId: null
    })
  },

  isFollowing: (seriesId: number) => {
    const { series } = get()
    return series.some(s => s.id === seriesId)
  },

  isInWatchlist: (seriesId: number) => {
    const { watchlist } = get()
    return watchlist.some(s => s.id === seriesId)
  }
}))
