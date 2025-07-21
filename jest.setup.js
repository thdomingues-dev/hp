import '@testing-library/jest-dom'
// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}

// Mock axios-retry module
jest.mock('axios-retry', () => ({
  __esModule: true,
  default: jest.fn(),
  exponentialDelay: jest.fn(() => 1000),
  isNetworkOrIdempotentRequestError: jest.fn(() => true),
}))

// Global test timeout
jest.setTimeout(10000)
