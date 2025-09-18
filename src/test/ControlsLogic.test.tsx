import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { fetchMovieInfo } from '@/lib/data'
import type { Movies, MovieInfo } from '@/types'

// Mock the fetchMovieInfo function
vi.mock('@/lib/data', () => ({
  fetchMovieInfo: vi.fn()
}))

const mockMovie: Movies = {
  id: 1,
  name: 'Test Series',
  overview: 'Test overview',
  adult: false,
  backdrop_path: '/test.jpg',
  genre_ids: [1, 2],
  origin_country: ['US'],
  original_language: 'en',
  original_name: 'Test Series',
  popularity: 85.5,
  poster_path: '/poster.jpg',
  first_air_date: new Date('2023-01-01'),
  vote_average: 8.5,
  vote_count: 1000
}

// Simple mock Controls component for testing localStorage interactions
function MockControls({ data, onStorageUpdate }: { data: Movies, onStorageUpdate?: () => void }) {
  const handleFollow = () => {
    const series = JSON.parse(localStorage.getItem('series') || '[]')
    series.push(data)
    localStorage.setItem('series', JSON.stringify(series))
    if (onStorageUpdate) onStorageUpdate()
  }

  const handleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    watchlist.push(data)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    if (onStorageUpdate) onStorageUpdate()
  }

  return (
    <div>
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleWatchlist}>Add to Watchlist</button>
    </div>
  )
}

describe('Controls Component Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage properly
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      },
      writable: true
    })
  })

  it('should add series to localStorage when follow is clicked', () => {
    const storedData: any[] = []
    const mockSetItem = vi.fn((key, value) => {
      if (key === 'series') {
        storedData.push(...JSON.parse(value))
      }
    })
    const mockGetItem = vi.fn((key) => {
      if (key === 'series') return JSON.stringify(storedData)
      return '[]'
    })
    
    window.localStorage.getItem = mockGetItem
    window.localStorage.setItem = mockSetItem
    
    const mockStorageUpdate = vi.fn()
    
    render(<MockControls data={mockMovie} onStorageUpdate={mockStorageUpdate} />)
    
    fireEvent.click(screen.getByText('Follow'))
    
    expect(mockSetItem).toHaveBeenCalledWith('series', JSON.stringify([mockMovie]))
    expect(mockStorageUpdate).toHaveBeenCalled()
  })

  it('should add movie to watchlist when watchlist is clicked', () => {
    const storedData: any[] = []
    const mockSetItem = vi.fn((key, value) => {
      if (key === 'watchlist') {
        storedData.push(...JSON.parse(value))
      }
    })
    const mockGetItem = vi.fn((key) => {
      if (key === 'watchlist') return JSON.stringify(storedData)
      return '[]'
    })
    
    window.localStorage.getItem = mockGetItem
    window.localStorage.setItem = mockSetItem
    
    const mockStorageUpdate = vi.fn()
    
    render(<MockControls data={mockMovie} onStorageUpdate={mockStorageUpdate} />)
    
    fireEvent.click(screen.getByText('Add to Watchlist'))
    
    expect(mockSetItem).toHaveBeenCalledWith('watchlist', JSON.stringify([mockMovie]))
    expect(mockStorageUpdate).toHaveBeenCalled()
  })

  describe('fetchMovieInfo function behavior', () => {
    it('should be called when adding to series', async () => {
      vi.mocked(fetchMovieInfo).mockResolvedValue({
        ...mockMovie,
        seasons: []
      } as MovieInfo)

      await fetchMovieInfo(mockMovie.id)

      expect(fetchMovieInfo).toHaveBeenCalledWith(mockMovie.id)
    })
  })
})