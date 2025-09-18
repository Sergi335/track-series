import SeriesList from '@/components/SeriesList'
import { useUserSeriesStore } from '@/store/userSeriesStore'
import type { MovieInfo } from '@/types'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the child components
vi.mock('@/components/MovieGrid', () => ({
  default: ({ series }: { series: MovieInfo[] }) => (
    <div data-testid="movie-grid">MovieGrid with {series.length} series</div>
  )
}))

vi.mock('@/components/MovieGridLoader', () => ({
  default: () => <div data-testid="loader">Loading...</div>
}))

vi.mock('@/components/Pagination', () => ({
  default: ({ totalPages }: { totalPages: number }) => (
    <div data-testid="pagination">Pagination with {totalPages} pages</div>
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

describe('SeriesList Component', () => {
  const mockSeriesData: MovieInfo[] = [
    {
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
      complete: false,
      watched_season: 1,
      watched_episode: 1
    },
    {
      id: 2,
      name: 'Better Call Saul',
      overview: 'Prequel to Breaking Bad',
      adult: false,
      backdrop_path: '/backdrop2.jpg',
      created_by: [],
      episode_run_time: [45],
      first_air_date: '2015-02-08',
      genres: [],
      homepage: '',
      in_production: false,
      languages: ['en'],
      last_air_date: '2022-08-15',
      last_episode_to_air: {
        id: 2,
        name: 'Saul Gone',
        overview: 'Final episode',
        vote_average: 9.0,
        vote_count: 200,
        air_date: new Date('2022-08-15'),
        episode_number: 13,
        episode_type: 'finale',
        production_code: 'BCS613',
        runtime: 47,
        season_number: 6,
        show_id: 60059,
        still_path: '/saul.jpg'
      },
      next_episode_to_air: null,
      networks: [],
      number_of_episodes: 63,
      number_of_seasons: 6,
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'Better Call Saul',
      popularity: 95,
      poster_path: '/poster2.jpg',
      production_companies: [],
      production_countries: [],
      seasons: [],
      spoken_languages: [],
      status: 'Ended',
      tagline: '',
      type: 'Scripted',
      vote_average: 8.8,
      vote_count: 3000,
      genre_ids: [18],
      complete: true,
      watched_season: 6,
      watched_episode: 13
    }
  ]

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

  it('should render "No tienes series guardadas" when no series', () => {
    render(<SeriesList page="1" />)

    expect(screen.getByText('No tienes series guardadas')).toBeInTheDocument()
  })

  it('should render series from store', async () => {
    useUserSeriesStore.setState({
      series: mockSeriesData,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="1" />)

    expect(screen.getByTestId('movie-grid')).toBeInTheDocument()
    expect(screen.getByText('MovieGrid with 2 series')).toBeInTheDocument()
  })

  it('should show loader when loading', () => {
    useUserSeriesStore.setState({
      series: [],
      loading: true,
      initialized: false,
      currentUserId: null,
      watchlist: []
    })

    render(<SeriesList page="1" />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should sort series with completed ones at the end', async () => {
    useUserSeriesStore.setState({
      series: mockSeriesData,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="1" />)

    expect(screen.getByTestId('movie-grid')).toBeInTheDocument()
  })

  it('should display pagination when there are more than 20 series', async () => {
    // Create 25 series to test pagination
    const manySeries = Array.from({ length: 25 }, (_, i) => ({
      ...mockSeriesData[0],
      id: i + 1,
      name: `Series ${i + 1}`
    }))

    useUserSeriesStore.setState({
      series: manySeries,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="1" />)

    expect(screen.getByTestId('pagination')).toBeInTheDocument()
    expect(screen.getByText('Pagination with 2 pages')).toBeInTheDocument()
  })

  it('should slice series correctly for pagination', async () => {
    // Create 25 series
    const manySeries = Array.from({ length: 25 }, (_, i) => ({
      ...mockSeriesData[0],
      id: i + 1,
      name: `Series ${i + 1}`
    }))

    useUserSeriesStore.setState({
      series: manySeries,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="1" />)

    // Should show 20 series on page 1
    expect(screen.getByText('MovieGrid with 20 series')).toBeInTheDocument()
  })

  it('should handle second page correctly', async () => {
    // Create 25 series
    const manySeries = Array.from({ length: 25 }, (_, i) => ({
      ...mockSeriesData[0],
      id: i + 1,
      name: `Series ${i + 1}`
    }))

    useUserSeriesStore.setState({
      series: manySeries,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="2" />)

    // Should show 5 series on page 2
    expect(screen.getByText('MovieGrid with 5 series')).toBeInTheDocument()
  })

  it('should not show pagination for single page', async () => {
    useUserSeriesStore.setState({
      series: mockSeriesData,
      loading: false,
      initialized: true,
      currentUserId: 'test',
      watchlist: []
    })

    render(<SeriesList page="1" />)

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })
})
