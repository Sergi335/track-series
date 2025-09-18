import { describe, it, expect } from 'vitest'
import type { Movies, MovieInfo, SearchResultsType, Credits, CastElement } from '@/types'

describe('Type Definitions', () => {
  describe('Movies interface', () => {
    it('should have required properties', () => {
      const movie: Movies = {
        adult: false,
        backdrop_path: '/test.jpg',
        genre_ids: [1, 2, 3],
        id: 1,
        origin_country: ['US'],
        original_language: 'en',
        original_name: 'Test Movie',
        overview: 'Test overview',
        popularity: 85.5,
        poster_path: '/poster.jpg',
        first_air_date: new Date('2023-01-01'),
        name: 'Test Movie',
        vote_average: 8.5,
        vote_count: 1000
      }

      expect(movie.id).toBe(1)
      expect(movie.name).toBe('Test Movie')
      expect(movie.vote_average).toBe(8.5)
      expect(movie.adult).toBe(false)
    })
  })

  describe('MovieInfo interface', () => {
    it('should extend Movies interface with additional properties', () => {
      const movieInfo: Partial<MovieInfo> = {
        id: 1,
        name: 'Test Series',
        in_production: true,
        number_of_episodes: 10,
        number_of_seasons: 1,
        status: 'Returning Series',
        type: 'Scripted',
        watched_season: 1,
        watched_episode: 5,
        complete: false
      }

      expect(movieInfo.in_production).toBe(true)
      expect(movieInfo.number_of_episodes).toBe(10)
      expect(movieInfo.watched_season).toBe(1)
      expect(movieInfo.complete).toBe(false)
    })
  })

  describe('SearchResultsType interface', () => {
    it('should have correct structure for API responses', () => {
      const searchResults: SearchResultsType = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
        error: false
      }

      expect(searchResults.page).toBe(1)
      expect(searchResults.total_pages).toBe(5)
      expect(Array.isArray(searchResults.results)).toBe(true)
      expect(typeof searchResults.error).toBe('boolean')
    })

    it('should handle error state', () => {
      const errorResults: SearchResultsType = {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        error: true
      }

      expect(errorResults.error).toBe(true)
      expect(errorResults.results).toHaveLength(0)
    })
  })

  describe('Credits and Cast interfaces', () => {
    it('should have proper cast structure', () => {
      const castMember: CastElement = {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Acting' as any,
        name: 'John Doe',
        original_name: 'John Doe',
        popularity: 75.5,
        profile_path: '/profile.jpg',
        character: 'Main Character',
        credit_id: 'credit123',
        order: 1
      }

      expect(castMember.name).toBe('John Doe')
      expect(castMember.character).toBe('Main Character')
      expect(castMember.order).toBe(1)
    })

    it('should have proper credits structure', () => {
      const credits: Credits = {
        cast: [],
        crew: [],
        id: 1
      }

      expect(Array.isArray(credits.cast)).toBe(true)
      expect(Array.isArray(credits.crew)).toBe(true)
      expect(credits.id).toBe(1)
    })
  })

  describe('Type safety', () => {
    it('should enforce type constraints', () => {
      // Test that TypeScript enforces the types correctly
      const testMovie: Movies = {
        adult: false,
        backdrop_path: '/test.jpg',
        genre_ids: [1, 2, 3],
        id: 1,
        origin_country: ['US'],
        original_language: 'en',
        original_name: 'Test Movie',
        overview: 'Test overview',
        popularity: 85.5,
        poster_path: '/poster.jpg',
        first_air_date: new Date('2023-01-01'),
        name: 'Test Movie',
        vote_average: 8.5,
        vote_count: 1000
      }

      // These should be typed correctly
      expect(typeof testMovie.adult).toBe('boolean')
      expect(typeof testMovie.id).toBe('number')
      expect(typeof testMovie.name).toBe('string')
      expect(Array.isArray(testMovie.genre_ids)).toBe(true)
      expect(testMovie.first_air_date instanceof Date).toBe(true)
    })
  })
})