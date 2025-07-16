import { getHouseColors } from '../theme'

describe('Theme Utilities', () => {
  describe('getHouseColors', () => {
    it('should return Gryffindor colors', () => {
      const colors = getHouseColors('Gryffindor')
      expect(colors).toEqual({
        primary: 'bg-red-600',
        secondary: 'bg-yellow-500',
        text: 'text-red-600',
        border: 'border-red-600',
      })
    })

    it('should return Slytherin colors', () => {
      const colors = getHouseColors('Slytherin')
      expect(colors).toEqual({
        primary: 'bg-green-600',
        secondary: 'bg-gray-400',
        text: 'text-green-600',
        border: 'border-green-600',
      })
    })

    it('should return Hufflepuff colors', () => {
      const colors = getHouseColors('Hufflepuff')
      expect(colors).toEqual({
        primary: 'bg-yellow-500',
        secondary: 'bg-black',
        text: 'text-yellow-600',
        border: 'border-yellow-500',
      })
    })

    it('should return Ravenclaw colors', () => {
      const colors = getHouseColors('Ravenclaw')
      expect(colors).toEqual({
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600',
        text: 'text-blue-600',
        border: 'border-blue-600',
      })
    })

    it('should return default colors for unknown house', () => {
      const colors = getHouseColors('Unknown House')
      expect(colors).toEqual({
        primary: 'bg-gray-600',
        secondary: 'bg-gray-400',
        text: 'text-gray-600',
        border: 'border-gray-600',
      })
    })

    it('should handle empty string', () => {
      const colors = getHouseColors('')
      expect(colors).toEqual({
        primary: 'bg-gray-600',
        secondary: 'bg-gray-400',
        text: 'text-gray-600',
        border: 'border-gray-600',
      })
    })

    it('should handle case sensitivity', () => {
      const colors = getHouseColors('gryffindor')
      expect(colors).toEqual({
        primary: 'bg-gray-600',
        secondary: 'bg-gray-400',
        text: 'text-gray-600',
        border: 'border-gray-600',
      })
    })

    it('should handle null/undefined gracefully', () => {
      const colorsNull = getHouseColors(null as any)
      const colorsUndefined = getHouseColors(undefined as any)

      const defaultColors = {
        primary: 'bg-gray-600',
        secondary: 'bg-gray-400',
        text: 'text-gray-600',
        border: 'border-gray-600',
      }

      expect(colorsNull).toEqual(defaultColors)
      expect(colorsUndefined).toEqual(defaultColors)
    })

    it('should have all required color properties', () => {
      const houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']

      houses.forEach(house => {
        const colors = getHouseColors(house)
        expect(colors).toHaveProperty('primary')
        expect(colors).toHaveProperty('secondary')
        expect(colors).toHaveProperty('text')
        expect(colors).toHaveProperty('border')

        // Verify all values are strings
        expect(typeof colors.primary).toBe('string')
        expect(typeof colors.secondary).toBe('string')
        expect(typeof colors.text).toBe('string')
        expect(typeof colors.border).toBe('string')

        // Verify they follow TailwindCSS class naming
        expect(colors.primary).toMatch(/^bg-/)
        expect(colors.secondary).toMatch(/^bg-/)
        expect(colors.text).toMatch(/^text-/)
        expect(colors.border).toMatch(/^border-/)
      })
    })
  })
})
