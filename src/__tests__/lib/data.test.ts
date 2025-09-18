import { fetchMovieInfo } from '@/lib/data'
import type { MockedFunction } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock fetch globally
const mockFetch = vi.fn() as MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('Data functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock environment variable
    process.env.AUTH = 'Bearer test-token'
  })

  describe('fetchMovieInfo', () => {
    const mockMovieData = {
      id: 1,
      name: 'Breaking Bad',
      overview: 'A high school chemistry teacher turned meth cook',
      first_air_date: '2008-01-20',
      seasons: [
        { season_number: 1, episode_count: 7 },
        { season_number: 2, episode_count: 13 }
      ]
    }

    it('should fetch movie info successfully', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockMovieData)
      } as Partial<Response>

      mockFetch.mockResolvedValue(mockResponse as Response)

      const result = await fetchMovieInfo(1)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/tv/1?language=es-ES',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer test-token'
          }
        }
      )
      expect(result).toEqual(mockMovieData)
    })

    it('should use correct API endpoint and headers', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockMovieData)
      } as Partial<Response>

      mockFetch.mockResolvedValue(mockResponse as Response)

      await fetchMovieInfo(123)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/tv/123?language=es-ES',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            accept: 'application/json',
            Authorization: 'Bearer test-token'
          })
        })
      )
    })

    it('should handle fetch errors', async () => {
      const mockResponse = {
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Not found' })
      } as Partial<Response>

      mockFetch.mockResolvedValue(mockResponse as Response)

      const result = await fetchMovieInfo(999)
      expect(result).toEqual({ error: 'Not found' })
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(fetchMovieInfo(1)).rejects.toThrow('Network error')
    })

    it('should use AUTH environment variable', async () => {
      process.env.AUTH = 'Bearer custom-token'

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockMovieData)
      } as Partial<Response>

      mockFetch.mockResolvedValue(mockResponse as Response)

      await fetchMovieInfo(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer custom-token'
          })
        })
      )
    })

    it('should handle empty AUTH environment variable', async () => {
      process.env.AUTH = ''

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockMovieData)
      } as Partial<Response>

      mockFetch.mockResolvedValue(mockResponse as Response)

      await fetchMovieInfo(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: ''
          })
        })
      )
    })
  })
})
