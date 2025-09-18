import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import type { MovieInfo } from '@/types'

// Mock the services
vi.mock('@/lib/services/userSeries', () => ({
  UserSeriesService: vi.fn().mockImplementation(() => ({
    getUserSeries: vi.fn().mockResolvedValue([]),
    followSeries: vi.fn().mockResolvedValue(true),
    unfollowSeries: vi.fn().mockResolvedValue(true),
    updateProgress: vi.fn().mockResolvedValue(true)
  }))
}))

vi.mock('@/lib/services/userWatchlist', () => ({
  UserWatchlistService: vi.fn().mockImplementation(() => ({
    getUserWatchlist: vi.fn().mockResolvedValue([]),
    addToWatchlist: vi.fn().mockResolvedValue(true),
    removeFromWatchlist: vi.fn().mockResolvedValue(true)
  }))
}))

describe('UserSeriesStore', () => {
  const mockSeries: MovieInfo = {
    id: 1,
    name: 'Breaking Bad',
    overview: 'Chemistry teacher turned meth cook',
    adult: false,
    backdrop_path: '/backdrop1.jpg',
    created_by: [],
    episode_run_time: [45],
    first_air_date: '2008-01-20',
    genres: [],
    homepage: '',
    in_production: false,
    languages: ['en'],
    last_air_date: '2013-09-29',
    last_episode_to_air: {} as any,
    next_episode_to_air: null,
    networks: [],
    number_of_episodes: 62,
    number_of_seasons: 5,
    origin_country: ['US'],
    original_language: 'en',
    original_name: 'Breaking Bad',
    popularity: 100,
    poster_path: '/poster1.jpg',
    production_companies: [],
    production_countries: [],
    seasons: [],
    spoken_languages: [],
    status: 'Ended',
    tagline: '',
    type: 'Scripted',
    vote_average: 9.5,
    vote_count: 5000,
    genre_ids: [18],
    watched_season: 1,
    watched_episode: 1,
    complete: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    useUserSeriesStore.setState({
      series: [],
      watchlist: [],
      loading: false,
      initialized: false,
      currentUserId: null
    })
  })

  it('should have initial state', () => {
    const store = useUserSeriesStore.getState()
    
    expect(store.series).toEqual([])
    expect(store.watchlist).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.initialized).toBe(false)
    expect(store.currentUserId).toBe(null)
  })

  it('should initialize user correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    await store.initializeUser('user123')
    
    const newState = useUserSeriesStore.getState()
    expect(newState.initialized).toBe(true)
    expect(newState.currentUserId).toBe('user123')
    expect(newState.loading).toBe(false)
  })

  it('should not reinitialize for same user', async () => {
    const store = useUserSeriesStore.getState()
    
    // Initialize first time
    await store.initializeUser('user123')
    
    // Mock service calls to verify they're not called again
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    // Try to initialize same user again
    await store.initializeUser('user123')
    
    expect(consoleSpy).toHaveBeenCalledWith('🔄 Usuario ya inicializado:', 'user123')
    
    consoleSpy.mockRestore()
  })

  it('should follow series correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    const result = await store.followSeries(mockSeries, 'user123')
    
    expect(result).toBe(true)
    
    const newState = useUserSeriesStore.getState()
    expect(newState.series).toContainEqual(mockSeries)
  })

  it('should not add duplicate series when following', async () => {
    const store = useUserSeriesStore.getState()
    
    // Add series first time
    await store.followSeries(mockSeries, 'user123')
    
    // Try to add same series again
    await store.followSeries(mockSeries, 'user123')
    
    const newState = useUserSeriesStore.getState()
    expect(newState.series).toHaveLength(1)
  })

  it('should unfollow series correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    // First add a series
    await store.followSeries(mockSeries, 'user123')
    
    // Then unfollow it
    const result = await store.unfollowSeries(mockSeries.id, 'user123')
    
    expect(result).toBe(true)
    
    const newState = useUserSeriesStore.getState()
    expect(newState.series).toHaveLength(0)
  })

  it('should update progress correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    // First add a series
    await store.followSeries(mockSeries, 'user123')
    
    // Update progress
    const updates = { watched_season: 2, watched_episode: 5, complete: false }
    const result = await store.updateProgress(mockSeries.id, 'user123', updates)
    
    expect(result).toBe(true)
    
    const newState = useUserSeriesStore.getState()
    const updatedSeries = newState.series.find(s => s.id === mockSeries.id)
    expect(updatedSeries?.watched_season).toBe(2)
    expect(updatedSeries?.watched_episode).toBe(5)
    expect(updatedSeries?.complete).toBe(false)
  })

  it('should add to watchlist correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    const result = await store.addToWatchlist(mockSeries, 'user123')
    
    expect(result).toBe(true)
    
    const newState = useUserSeriesStore.getState()
    expect(newState.watchlist).toContainEqual(mockSeries)
  })

  it('should not add duplicate to watchlist', async () => {
    const store = useUserSeriesStore.getState()
    
    // Add to watchlist first time
    await store.addToWatchlist(mockSeries, 'user123')
    
    // Try to add same series again
    await store.addToWatchlist(mockSeries, 'user123')
    
    const newState = useUserSeriesStore.getState()
    expect(newState.watchlist).toHaveLength(1)
  })

  it('should remove from watchlist correctly', async () => {
    const store = useUserSeriesStore.getState()
    
    // First add to watchlist
    await store.addToWatchlist(mockSeries, 'user123')
    
    // Then remove from watchlist
    const result = await store.removeFromWatchlist(mockSeries.id, 'user123')
    
    expect(result).toBe(true)
    
    const newState = useUserSeriesStore.getState()
    expect(newState.watchlist).toHaveLength(0)
  })

  it('should clear user data correctly', () => {
    const store = useUserSeriesStore.getState()
    
    // Set some data first
    useUserSeriesStore.setState({
      series: [mockSeries],
      watchlist: [mockSeries],
      loading: true,
      initialized: true,
      currentUserId: 'user123'
    })
    
    store.clearUserData()
    
    const newState = useUserSeriesStore.getState()
    expect(newState.series).toEqual([])
    expect(newState.watchlist).toEqual([])
    expect(newState.loading).toBe(false)
    expect(newState.initialized).toBe(false)
    expect(newState.currentUserId).toBe(null)
  })

  it('should check if following correctly', () => {
    const store = useUserSeriesStore.getState()
    
    // Initially not following
    expect(store.isFollowing(mockSeries.id)).toBe(false)
    
    // Add series to state
    useUserSeriesStore.setState({ series: [mockSeries] })
    
    // Now should be following
    expect(store.isFollowing(mockSeries.id)).toBe(true)
  })

  it('should check if in watchlist correctly', () => {
    const store = useUserSeriesStore.getState()
    
    // Initially not in watchlist
    expect(store.isInWatchlist(mockSeries.id)).toBe(false)
    
    // Add series to watchlist
    useUserSeriesStore.setState({ watchlist: [mockSeries] })
    
    // Now should be in watchlist
    expect(store.isInWatchlist(mockSeries.id)).toBe(true)
  })

  it('should handle service errors gracefully', async () => {
    // Mock service to throw error
    const { UserSeriesService } = await import('@/lib/services/userSeries')
    const mockService = UserSeriesService as any
    mockService.mockImplementation(() => ({
      getUserSeries: vi.fn().mockRejectedValue(new Error('Service error')),
      followSeries: vi.fn().mockRejectedValue(new Error('Service error'))
    }))

    const store = useUserSeriesStore.getState()
    
    // Should handle initialization error
    await store.initializeUser('user123')
    const newState = useUserSeriesStore.getState()
    expect(newState.initialized).toBe(true)
    expect(newState.series).toEqual([])
    
    // Should handle follow error
    const result = await store.followSeries(mockSeries, 'user123')
    expect(result).toBe(false)
  })
})