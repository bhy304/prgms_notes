import '@testing-library/jest-dom'
import { vi } from 'vitest'

// window.alert 함수를 모킹
Object.defineProperty(window, 'alert', {
  writable: true,
  value: vi.fn(),
})
