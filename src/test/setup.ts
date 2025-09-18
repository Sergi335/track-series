import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.localStorage
const localStorageMock = {
  getItem: vi.fn().mockReturnValue('[]'),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Mock fetch
global.fetch = vi.fn()

// Mock process.env
process.env.AUTH = 'Bearer test-auth-token'

// Mock window.dispatchEvent
Object.defineProperty(window, 'dispatchEvent', {
  value: vi.fn(),
  writable: true
})
