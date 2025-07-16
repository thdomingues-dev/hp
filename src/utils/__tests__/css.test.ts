import { cn } from '../css'

describe('CSS Utilities', () => {
  describe('cn', () => {
    it('should combine class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'valid')
      expect(result).toBe('base valid')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        active: true,
        disabled: false,
        primary: true,
      })
      expect(result).toBe('active primary')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle mixed input types', () => {
      const result = cn(
        'base',
        ['array1', 'array2'],
        { conditional: true, hidden: false },
        true && 'dynamic'
      )
      expect(result).toBe('base array1 array2 conditional dynamic')
    })
  })
})
