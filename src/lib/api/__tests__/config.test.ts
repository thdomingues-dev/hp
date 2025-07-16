import { API_CONFIG, Endpoints, ERROR_MESSAGES } from '../config'

describe('API Configuration', () => {
  describe('API_CONFIG', () => {
    it('should have correct base URL', () => {
      expect(API_CONFIG.BASE_URL).toBe('https://hp-api.onrender.com/api')
    })

    it('should have reasonable timeout', () => {
      expect(API_CONFIG.TIMEOUT).toBe(10000)
      expect(typeof API_CONFIG.TIMEOUT).toBe('number')
    })

    it('should have retry attempts configured', () => {
      expect(API_CONFIG.RETRY_ATTEMPTS).toBe(3)
      expect(typeof API_CONFIG.RETRY_ATTEMPTS).toBe('number')
    })
  })

  describe('Endpoints', () => {
    it('should have all required endpoints', () => {
      expect(Endpoints.CHARACTERS).toBe('/characters')
      expect(Endpoints.HOUSES).toBe('/houses')
      expect(Endpoints.SPELLS).toBe('/spells')
    })

    it('should have valid endpoint format', () => {
      Object.values(Endpoints).forEach(endpoint => {
        expect(endpoint).toMatch(/^\/[a-z]+$/)
      })
    })
  })

  describe('ERROR_MESSAGES', () => {
    it('should have all required error messages', () => {
      expect(ERROR_MESSAGES.NETWORK_ERROR).toBeDefined()
      expect(ERROR_MESSAGES.TIMEOUT_ERROR).toBeDefined()
      expect(ERROR_MESSAGES.NOT_FOUND).toBeDefined()
      expect(ERROR_MESSAGES.GENERIC_ERROR).toBeDefined()
    })

    it('should have meaningful error messages', () => {
      expect(ERROR_MESSAGES.NETWORK_ERROR).toContain('Connection error')
      expect(ERROR_MESSAGES.TIMEOUT_ERROR).toContain('timeout')
      expect(ERROR_MESSAGES.NOT_FOUND).toContain('not found')
      expect(ERROR_MESSAGES.GENERIC_ERROR).toContain('Something went wrong')
    })

    it('should be a descriptive error messages', () => {
      expect(ERROR_MESSAGES.NETWORK_ERROR).toBe('Connection error. Please check your internet.')
      expect(ERROR_MESSAGES.TIMEOUT_ERROR).toBe('Request timeout. Please try again.')
      expect(ERROR_MESSAGES.NOT_FOUND).toBe('Resource not found.')
      expect(ERROR_MESSAGES.GENERIC_ERROR).toBe('Something went wrong. Please try again.')
    })
  })
})
