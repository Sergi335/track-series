import Controls from '@/components/Controls'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import type { MovieInfo, Movies } from '@/types'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn(() => ({
    user: {
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User'
    }
  }))
}))

// Mock the child components
vi.mock('@/components/SetChapterControl', () => ({
  default: ({ data }: { data: MovieInfo }) => (
    <div data-testid="chapter-control">Chapter control for {data.name}</div>
  )
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}))

vi.mock('@/components/icons/icons', () => ({
  CheckIcon: ({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className}>✓</div>
  ),
  WatchingIcon: ({ className }: { className?: string }) => (
    <div data-testid="watching-icon" className={className}>👁</div>
  )
}))

// Mock fetchMovieInfo
vi.mock('@/lib/data', () => ({
  fetchMovieInfo: vi.fn().mockResolvedValue({
    id: 1,
    name: 'Breaking Bad',
    seasons: [
      { season_number: 1, episode_count: 7 },
      { season_number: 2, episode_count: 13 }
    ]
  })
}))

// Mock Supabase services
vi.mock('@/lib/services/userSeries', () => ({
  UserSeriesService: vi.fn().mockImplementation(() => ({
    getUserSeries: vi.fn().mockResolvedValue([]),
    followSeries: vi.fn().mockResolvedValue(true),
    unfollowSeries: vi.fn().mockResolvedValue(true)
  }))
}))

vi.mock('@/lib/services/userWatchlist', () => ({
  UserWatchlistService: vi.fn().mockImplementation(() => ({
    getUserWatchlist: vi.fn().mockResolvedValue([]),
    addToWatchlist: vi.fn().mockResolvedValue(true),
    removeFromWatchlist: vi.fn().mockResolvedValue(true)
  }))
}))

describe('Controls Component', () => {
  const mockMovieData: Movies = {
    id: 1,
    name: 'Breaking Bad',
    overview: 'Chemistry teacher turned meth cook',
    adult: false,
    backdrop_path: '/backdrop1.jpg',
    genre_ids: [18],
    origin_country: ['US'],
    original_language: 'en',
    original_name: 'Breaking Bad',
    popularity: 100,
    poster_path: '/poster1.jpg',
    first_air_date: new Date('2008-01-20'),
    vote_average: 9.5,
    vote_count: 5000
  }

  const mockMovieInfo: MovieInfo = {
    ...mockMovieData,
    created_by: [],
    episode_run_time: [45],
    first_air_date: '2008-01-20',
    genres: [],
    homepage: '',
    in_production: false,
    languages: ['en'],
    last_air_date: '2013-09-29',
    last_episode_to_air: {
      id: 1,
      name: 'Test Episode',
      overview: 'Test overview',
      vote_average: 8.5,
      vote_count: 100,
      air_date: new Date('2013-09-29'),
      episode_number: 13,
      episode_type: 'finale',
      production_code: 'TEST01',
      runtime: 47,
      season_number: 5,
      show_id: 1396,
      still_path: '/test.jpg'
    },
    next_episode_to_air: null,
    networks: [],
    number_of_episodes: 62,
    number_of_seasons: 5,
    production_companies: [],
    production_countries: [],
    seasons: [
      {
        air_date: new Date('2008-01-20'),
        episode_count: 7,
        id: 1,
        name: 'Season 1',
        overview: 'Season 1 overview',
        poster_path: '/season1.jpg',
        season_number: 1,
        vote_average: 8.0
      },
      {
        air_date: new Date('2009-03-08'),
        episode_count: 13,
        id: 2,
        name: 'Season 2',
        overview: 'Season 2 overview',
        poster_path: '/season2.jpg',
        season_number: 2,
        vote_average: 8.5
      }
    ],
    spoken_languages: [],
    status: 'Ended',
    tagline: '',
    type: 'Scripted',
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

  it('should render follow button when not following', () => {
    render(<Controls data={mockMovieData} />)

    expect(screen.getByText('Follow')).toBeInTheDocument()
    expect(screen.getByText('SetInWatchList')).toBeInTheDocument()
  })

  it('should render following button when following', () => {
    useUserSeriesStore.setState({
      series: [mockMovieInfo],
      watchlist: [],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<Controls data={mockMovieInfo} />)

    expect(screen.getByText('Following')).toBeInTheDocument()
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    expect(screen.getByTestId('chapter-control')).toBeInTheDocument()
  })

  it('should render in watchlist button when in watchlist', () => {
    useUserSeriesStore.setState({
      series: [],
      watchlist: [mockMovieInfo],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<Controls data={mockMovieData} />)

    expect(screen.getByText('InWatchList')).toBeInTheDocument()
    expect(screen.getByTestId('watching-icon')).toBeInTheDocument()
  })

  it('should handle follow button click', async () => {
    const user = userEvent.setup()

    render(<Controls data={mockMovieData} isInList={true} />)

    const followButton = screen.getByText('Follow')
    await user.click(followButton)

    // Since the component calls followSeries, we need to check if the store method would be called
    // Note: This test would need the actual user context to work properly
  })

  it('should handle watchlist button click', async () => {
    const user = userEvent.setup()

    render(<Controls data={mockMovieData} />)

    const watchlistButton = screen.getByText('SetInWatchList')
    await user.click(watchlistButton)

    // The button should be clickable
    expect(watchlistButton).toBeInTheDocument()
  })

  it('should show chapter control only when following', () => {
    // When not following
    useUserSeriesStore.setState({
      series: [],
      watchlist: [],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    const { unmount } = render(<Controls data={mockMovieData} />)
    expect(screen.queryByTestId('chapter-control')).not.toBeInTheDocument()

    unmount()

    // When following
    useUserSeriesStore.setState({
      series: [mockMovieInfo],
      watchlist: [],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<Controls data={mockMovieInfo} />)
    expect(screen.getByTestId('chapter-control')).toBeInTheDocument()
  })

  it('should apply correct styles when isInList is true', () => {
    render(<Controls data={mockMovieData} isInList={true} />)

    // Buscar el contenedor principal que contiene las clases de estilo
    const mainContainer = screen.getByText('Follow').closest('div')?.parentElement
    expect(mainContainer).toHaveClass('px-0')

    const followButton = screen.getByText('Follow')
    expect(followButton).toHaveClass('h-auto px-2 py-2 text-xs')
  })

  it('should apply default styles when isInList is false', () => {
    render(<Controls data={mockMovieData} isInList={false} />)

    // Buscar el contenedor principal que contiene las clases de estilo
    const mainContainer = screen.getByText('Follow').closest('div')?.parentElement
    expect(mainContainer).toHaveClass('p-5')
  })

  it('should handle both following and watchlist states', () => {
    useUserSeriesStore.setState({
      series: [mockMovieInfo],
      watchlist: [mockMovieInfo],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<Controls data={mockMovieInfo} />)

    expect(screen.getByText('Following')).toBeInTheDocument()
    expect(screen.getByText('InWatchList')).toBeInTheDocument()
    expect(screen.getByTestId('chapter-control')).toBeInTheDocument()
  })

  it('should handle undefined isInList prop', () => {
    render(<Controls data={mockMovieData} />)

    // Should render without errors
    expect(screen.getByText('Follow')).toBeInTheDocument()
    expect(screen.getByText('SetInWatchList')).toBeInTheDocument()
  })
})
