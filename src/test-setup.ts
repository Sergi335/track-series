import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

// Mock window.localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock window.addEventListener and window.removeEventListener
const windowEventListeners: Record<string, Function[]> = {}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock window event methods
Object.defineProperty(window, 'addEventListener', {
  value: vi.fn((event: string, callback: Function) => {
    if (!windowEventListeners[event]) {
      windowEventListeners[event] = []
    }
    windowEventListeners[event].push(callback)
  }),
  writable: true,
})

Object.defineProperty(window, 'removeEventListener', {
  value: vi.fn((event: string, callback: Function) => {
    if (windowEventListeners[event]) {
      const index = windowEventListeners[event].indexOf(callback)
      if (index > -1) {
        windowEventListeners[event].splice(index, 1)
      }
    }
  }),
  writable: true,
})

Object.defineProperty(window, 'dispatchEvent', {
  value: vi.fn((event: Event) => {
    if (windowEventListeners[event.type]) {
      windowEventListeners[event.type].forEach(callback => callback(event))
    }
  }),
  writable: true,
})

// Clean up between tests
beforeEach(() => {
  vi.clearAllMocks()
  // Reset localStorage mock
  localStorageMock.getItem.mockImplementation(() => null)
  localStorageMock.setItem.mockImplementation(() => {})
  localStorageMock.removeItem.mockImplementation(() => {})
  localStorageMock.clear.mockImplementation(() => {})
  
  // Clear event listeners
  Object.keys(windowEventListeners).forEach(key => {
    windowEventListeners[key] = []
  })
})