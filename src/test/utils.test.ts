import { describe, it, expect } from 'vitest'
import { cn, generatePagination } from '@/lib/utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('bg-blue-500', 'text-white', 'p-4')
      expect(result).toBe('bg-blue-500 text-white p-4')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should merge conflicting Tailwind classes correctly', () => {
      const result = cn('p-2', 'p-4')
      expect(result).toBe('p-4')
    })
  })

  describe('generatePagination function', () => {
    it('should return all pages when total pages is 7 or less', () => {
      expect(generatePagination(3, 5)).toEqual([1, 2, 3, 4, 5])
      expect(generatePagination(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('should show first 3, ellipsis, and last 2 when current page is among first 3', () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10])
      expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10])
      expect(generatePagination(3, 10)).toEqual([1, 2, 3, '...', 9, 10])
    })

    it('should show first 2, ellipsis, and last 3 when current page is among last 3', () => {
      expect(generatePagination(8, 10)).toEqual([1, 2, '...', 8, 9, 10])
      expect(generatePagination(9, 10)).toEqual([1, 2, '...', 8, 9, 10])
      expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10])
    })

    it('should show middle pagination with ellipses on both sides', () => {
      expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
      expect(generatePagination(6, 15)).toEqual([1, '...', 5, 6, 7, '...', 15])
    })

    it('should handle edge cases', () => {
      expect(generatePagination(1, 1)).toEqual([1])
      expect(generatePagination(1, 2)).toEqual([1, 2])
    })
  })
})
