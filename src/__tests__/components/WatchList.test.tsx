import WatchList from '@/components/WatchList'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import type { MovieInfo } from '@/types'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the MovieGrid component
vi.mock('@/components/MovieGrid', () => ({
  default: ({ series }: { series: MovieInfo[] }) => (
    <div data-testid="movie-grid">MovieGrid with {series.length} series</div>
  )
}))

// Mock Supabase services
vi.mock('@/lib/services/userSeries', () => ({
  UserSeriesService: vi.fn().mockImplementation(() => ({
    getUserSeries: vi.fn().mockResolvedValue([])
  }))
}))

vi.mock('@/lib/services/userWatchlist', () => ({
  UserWatchlistService: vi.fn().mockImplementation(() => ({
    getUserWatchlist: vi.fn().mockResolvedValue([])
  }))
}))

describe('WatchList Component', () => {
  const mockWatchlistData: MovieInfo[] = [
    {
      id: 1,
      name: 'The Witcher',
      overview: 'Fantasy series about Geralt of Rivia',
      adult: false,
      backdrop_path: '/backdrop1.jpg',
      created_by: [],
      episode_run_time: [60],
      first_air_date: '2019-12-20',
      genres: [],
      homepage: '',
      in_production: true,
      languages: ['en'],
      last_air_date: '2023-07-27',
      last_episode_to_air: {
        id: 3,
        name: 'The Cost of Chaos',
        overview: 'Latest episode',
        vote_average: 8.2,
        vote_count: 150,
        air_date: new Date('2023-07-27'),
        episode_number: 8,
        episode_type: 'standard',
        production_code: 'WIT308',
        runtime: 60,
        season_number: 3,
        show_id: 71912,
        still_path: '/witcher.jpg'
      },
      next_episode_to_air: null,
      networks: [],
      number_of_episodes: 24,
      number_of_seasons: 3,
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'The Witcher',
      popularity: 120,
      poster_path: '/poster1.jpg',
      production_companies: [],
      production_countries: [],
      seasons: [],
      spoken_languages: [],
      status: 'Returning Series',
      tagline: '',
      type: 'Scripted',
      vote_average: 8.2,
      vote_count: 4000,
      genre_ids: [10759, 18]
    },
    {
      id: 2,
      name: 'House of the Dragon',
      overview: 'Game of Thrones prequel',
      adult: false,
      backdrop_path: '/backdrop2.jpg',
      created_by: [],
      episode_run_time: [60],
      first_air_date: '2022-08-21',
      genres: [],
      homepage: '',
      in_production: true,
      languages: ['en'],
      last_air_date: '2024-08-04',
      last_episode_to_air: {
        id: 4,
        name: 'The Queen Who Ever Was',
        overview: 'Season 2 finale',
        vote_average: 8.8,
        vote_count: 180,
        air_date: new Date('2024-08-04'),
        episode_number: 8,
        episode_type: 'finale',
        production_code: 'HOTD208',
        runtime: 70,
        season_number: 2,
        show_id: 94997,
        still_path: '/hotd.jpg'
      },
      next_episode_to_air: null,
      networks: [],
      number_of_episodes: 18,
      number_of_seasons: 2,
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'House of the Dragon',
      popularity: 150,
      poster_path: '/poster2.jpg',
      production_companies: [],
      production_countries: [],
      seasons: [],
      spoken_languages: [],
      status: 'Returning Series',
      tagline: '',
      type: 'Scripted',
      vote_average: 8.5,
      vote_count: 6000,
      genre_ids: [10759, 18]
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    useUserSeriesStore.setState({
      series: [],
      watchlist: [],
      loading: false,
      initialized: true,
      currentUserId: null
    })
  })

  it('should render "No tienes series en tu watchlist" when no watchlist', () => {
    render(<WatchList />)

    expect(screen.getByText('No tienes series en tu watchlist')).toBeInTheDocument()
  })

  it('should show loading state', () => {
    useUserSeriesStore.setState({
      series: [],
      watchlist: [],
      loading: true,
      initialized: false,
      currentUserId: null
    })

    render(<WatchList />)

    const loaders = screen.getAllByRole('loader')
    expect(loaders).toHaveLength(10)
  })

  it('should render series from store watchlist', async () => {
    useUserSeriesStore.setState({
      series: [],
      watchlist: mockWatchlistData,
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<WatchList />)

    expect(screen.getByTestId('movie-grid')).toBeInTheDocument()
    expect(screen.getByText('MovieGrid with 2 series')).toBeInTheDocument()
  })

  it('should handle empty watchlist array', () => {
    useUserSeriesStore.setState({
      series: [],
      watchlist: [],
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<WatchList />)

    expect(screen.getByText('No tienes series en tu watchlist')).toBeInTheDocument()
    expect(screen.queryByTestId('movie-grid')).not.toBeInTheDocument()
  })

  it('should work with large watchlist', async () => {
    const largeSeries = Array.from({ length: 50 }, (_, i) => ({
      ...mockWatchlistData[0],
      id: i + 1,
      name: `Series ${i + 1}`
    }))

    useUserSeriesStore.setState({
      series: [],
      watchlist: largeSeries,
      loading: false,
      initialized: true,
      currentUserId: 'test'
    })

    render(<WatchList />)

    expect(screen.getByTestId('movie-grid')).toBeInTheDocument()
    expect(screen.getByText('MovieGrid with 50 series')).toBeInTheDocument()
  })
})
