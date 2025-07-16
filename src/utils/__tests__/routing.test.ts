import { slugify, parseSlug } from '../routing'

describe('Routing Utilities', () => {
  describe('slugify', () => {
    it('should convert name to lowercase slug', () => {
      const result = slugify('Harry Potter')
      expect(result).toBe('harry-potter')
    })

    it('should replace spaces with hyphens', () => {
      const result = slugify('Hermione Jean Granger')
      expect(result).toBe('hermione-jean-granger')
    })

    it('should remove special characters', () => {
      const result = slugify("Rubeus Hagrid's Hut")
      expect(result).toBe('rubeus-hagrids-hut')
    })

    it('should handle multiple spaces', () => {
      const result = slugify('Harry  Potter   With  Spaces')
      expect(result).toBe('harry-potter-with-spaces')
    })

    it('should handle names with accents and special chars', () => {
      const result = slugify('Fleur Delacour (Triwizard)')
      expect(result).toBe('fleur-delacour-triwizard')
    })

    it('should handle empty string', () => {
      const result = slugify('')
      expect(result).toBe('')
    })

    it('should handle single word', () => {
      const result = slugify('Voldemort')
      expect(result).toBe('voldemort')
    })
  })

  describe('parseSlug', () => {
    it('should convert slug back to title case', () => {
      const result = parseSlug('harry-potter')
      expect(result).toBe('Harry Potter')
    })

    it('should handle multiple words', () => {
      const result = parseSlug('hermione-jean-granger')
      expect(result).toBe('Hermione Jean Granger')
    })

    it('should handle single word', () => {
      const result = parseSlug('voldemort')
      expect(result).toBe('Voldemort')
    })

    it('should handle empty string', () => {
      const result = parseSlug('')
      expect(result).toBe('')
    })

    it('should capitalize each word correctly', () => {
      const result = parseSlug('albus-percival-wulfric-brian-dumbledore')
      expect(result).toBe('Albus Percival Wulfric Brian Dumbledore')
    })
  })
})
