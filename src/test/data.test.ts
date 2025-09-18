import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchMovieInfo } from '@/lib/data'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('data fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchMovieInfo', () => {
    it('should fetch movie information successfully', async () => {
      const mockMovieData = {
        id: 123,
        name: 'Test Series',
        overview: 'A test series',
        vote_average: 8.5,
        vote_count: 1000,
        in_production: true,
        popularity: 85.5,
        seasons: [
          {
            id: 1,
            season_number: 1,
            episode_count: 10,
            name: 'Season 1'
          }
        ]
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovieData
      })

      const result = await fetchMovieInfo(123)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/tv/123?language=es-ES',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer test-auth-token'
          }
        }
      )
      expect(result).toEqual(mockMovieData)
    })

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' })
      })

      const result = await fetchMovieInfo(999)

      expect(result).toEqual({ error: 'Not found' })
    })

    it('should handle network errors', async () => {
      const mockError = new Error('Network error')
      mockFetch.mockRejectedValueOnce(mockError)

      await expect(fetchMovieInfo(123)).rejects.toThrow('Network error')
    })

    it('should use correct headers with authorization', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      })

      await fetchMovieInfo(456)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-auth-token'
          })
        })
      )
    })
  })
})