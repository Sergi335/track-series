import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeButtons from '@/components/HomeButtons'

describe('HomeButtons Component', () => {
  it('should render genre exploration section', () => {
    render(<HomeButtons />)
    
    expect(screen.getByText('Explora por Géneros')).toBeInTheDocument()
    expect(screen.getByText('Sumérgete en mundos únicos. Cada género tiene su propia magia esperando a ser descubierta.')).toBeInTheDocument()
  })

  it('should render genre cards with correct links', () => {
    render(<HomeButtons />)
    
    // Check for genre links
    const comedyLink = screen.getByText('Explorar Comedia').closest('a')
    const mysteryLink = screen.getByText('Explorar Misterio').closest('a')
    const scifiLink = screen.getByText('Explorar Sci Fi').closest('a')
    
    expect(comedyLink).toHaveAttribute('href', '/featured/comedy')
    expect(mysteryLink).toHaveAttribute('href', '/featured/mystery')
    expect(scifiLink).toHaveAttribute('href', '/featured/scifi')
  })

  it('should render genre titles', () => {
    render(<HomeButtons />)
    
    expect(screen.getByText('Comedia')).toBeInTheDocument()
    expect(screen.getByText('Misterio')).toBeInTheDocument()
    expect(screen.getByText('Sci Fi')).toBeInTheDocument()
  })

  it('should render genre descriptions', () => {
    render(<HomeButtons />)
    
    expect(screen.getByText('Ríete sin parar con los mejores momentos cómicos')).toBeInTheDocument()
    expect(screen.getByText('Desentraña enigmas y vive la tensión del suspenso')).toBeInTheDocument()
    expect(screen.getByText('Explora futuros fascinantes y tecnologías extraordinarias')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    const { container } = render(<HomeButtons />)
    
    // Check for grid layout
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })
})