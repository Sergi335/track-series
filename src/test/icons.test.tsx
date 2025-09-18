import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CheckIcon, PlusIcon, MinusIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/icons'

describe('Icon Components', () => {
  describe('CheckIcon', () => {
    it('should render correctly', () => {
      const { container } = render(<CheckIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(<CheckIcon className="custom-class" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('custom-class')
    })
  })

  describe('PlusIcon', () => {
    it('should render correctly', () => {
      const { container } = render(<PlusIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(<PlusIcon className="icon-large" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('icon-large')
    })
  })

  describe('MinusIcon', () => {
    it('should render correctly', () => {
      const { container } = render(<MinusIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have correct stroke color', () => {
      const { container } = render(<MinusIcon />)
      const paths = container.querySelectorAll('path[stroke="#9B4CFF"]')
      expect(paths.length).toBeGreaterThan(0)
    })
  })

  describe('ArrowLeftIcon', () => {
    it('should render correctly', () => {
      const { container } = render(<ArrowLeftIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('ArrowRightIcon', () => {
    it('should render correctly', () => {
      const { container } = render(<ArrowRightIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })
})
