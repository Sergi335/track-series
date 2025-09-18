import { describe, it, expect } from 'vitest'
import { cn, generatePagination, searchInFiltered } from '@/lib/utils'
import type { Movies } from '@/types'

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge classes correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
    })

    it('should handle conditional classes', () => {
      expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class')
      expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
    })

    it('should handle conflicting Tailwind classes', () => {
      // twMerge should remove conflicting classes
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    })
  })

  describe('generatePagination function', () => {
    it('should return all pages when total pages <= 7', () => {
      expect(generatePagination(3, 5)).toEqual([1, 2, 3, 4, 5])
      expect(generatePagination(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('should handle first 3 pages scenario', () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10])
      expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10])
      expect(generatePagination(3, 10)).toEqual([1, 2, 3, '...', 9, 10])
    })

    it('should handle last 3 pages scenario', () => {
      expect(generatePagination(8, 10)).toEqual([1, 2, '...', 8, 9, 10])
      expect(generatePagination(9, 10)).toEqual([1, 2, '...', 8, 9, 10])
      expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10])
    })

    it('should handle middle pages scenario', () => {
      expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
      expect(generatePagination(6, 12)).toEqual([1, '...', 5, 6, 7, '...', 12])
    })

    it('should handle edge cases', () => {
      expect(generatePagination(1, 1)).toEqual([1])
      expect(generatePagination(1, 2)).toEqual([1, 2])
    })
  })

  describe('searchInFiltered function', () => {
    const mockMovies: Movies[] = [
      {
        id: 1,
        name: 'Breaking Bad',
        original_name: 'Breaking Bad',
        overview: 'A high school chemistry teacher turned meth cook',
        adult: false,
        backdrop_path: '/backdrop1.jpg',
        genre_ids: [18],
        origin_country: ['US'],
        original_language: 'en',
        popularity: 100,
        poster_path: '/poster1.jpg',
        first_air_date: new Date('2008-01-20'),
        vote_average: 9.5,
        vote_count: 5000
      },
      {
        id: 2,
        name: 'Better Call Saul',
        original_name: 'Better Call Saul',
        overview: 'The story of Jimmy McGill before Saul Goodman',
        adult: false,
        backdrop_path: '/backdrop2.jpg',
        genre_ids: [18],
        origin_country: ['US'],
        original_language: 'en',
        popularity: 95,
        poster_path: '/poster2.jpg',
        first_air_date: new Date('2015-02-08'),
        vote_average: 8.8,
        vote_count: 3000
      },
      {
        id: 3,
        name: 'Stranger Things',
        original_name: 'Stranger Things',
        overview: 'Kids in small town discover supernatural mysteries',
        adult: false,
        backdrop_path: '/backdrop3.jpg',
        genre_ids: [18, 9648],
        origin_country: ['US'],
        original_language: 'en',
        popularity: 110,
        poster_path: '/poster3.jpg',
        first_air_date: new Date('2016-07-15'),
        vote_average: 8.7,
        vote_count: 4500
      }
    ]

    it('should return all movies when query is empty', () => {
      expect(searchInFiltered(mockMovies, '')).toEqual(mockMovies)
    })

    it('should filter by name', () => {
      const result = searchInFiltered(mockMovies, 'breaking')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Breaking Bad')
    })

    it('should filter by original_name', () => {
      const result = searchInFiltered(mockMovies, 'saul')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Better Call Saul')
    })

    it('should filter by overview', () => {
      const result = searchInFiltered(mockMovies, 'chemistry')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Breaking Bad')
    })

    it('should be case insensitive', () => {
      const result = searchInFiltered(mockMovies, 'STRANGER')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Stranger Things')
    })

    it('should return multiple matches', () => {
      const result = searchInFiltered(mockMovies, 'things')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Stranger Things')
    })

    it('should return empty array when no matches', () => {
      const result = searchInFiltered(mockMovies, 'nonexistent')
      expect(result).toHaveLength(0)
    })

    it('should handle partial matches', () => {
      const result = searchInFiltered(mockMovies, 'bad')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Breaking Bad')
    })
  })
})