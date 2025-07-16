import { getAllSpells, findSpellByName } from '../../endpoints/spells'
import { Spell } from '@/types'
import * as client from '../../client'

// Mock the client module
jest.mock('../../client', () => ({
  get: jest.fn(),
}))

const mockGet = client.get as jest.MockedFunction<typeof client.get>

describe('Spells API Endpoints', () => {
  const mockSpells: Spell[] = [
    {
      id: 'spell1',
      name: 'Expelliarmus',
      incantation: 'Expelliarmus',
      effect: 'Disarms opponent',
      canBeVerbal: true,
      type: 'Charm',
      light: 'Red',
      creator: 'Unknown',
    },
    {
      id: 'spell2',
      name: 'Wingardium Leviosa',
      incantation: 'Wingardium Leviosa',
      effect: 'Makes objects levitate',
      canBeVerbal: true,
      type: 'Charm',
      light: 'White',
      creator: 'Jarleth Hobart',
    },
    {
      id: 'spell3',
      name: 'Avada Kedavra',
      incantation: 'Avada Kedavra',
      effect: 'Instantly kills opponent',
      canBeVerbal: true,
      type: 'Curse',
      light: 'Green',
      creator: 'Unknown',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllSpells', () => {
    it('should fetch all spells', async () => {
      mockGet.mockResolvedValue(mockSpells)

      const result = await getAllSpells()

      expect(mockGet).toHaveBeenCalledWith('/spells')
      expect(result).toEqual(mockSpells)
      expect(result).toHaveLength(3)
    })

    it('should propagate errors from client', async () => {
      const error = new Error('Network error')
      mockGet.mockRejectedValue(error)

      await expect(getAllSpells()).rejects.toThrow('Network error')
      expect(mockGet).toHaveBeenCalledWith('/spells')
    })

    it('should return empty array when no spells found', async () => {
      mockGet.mockResolvedValue([])

      const result = await getAllSpells()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle response with proper spell structure', async () => {
      mockGet.mockResolvedValue(mockSpells)

      const result = await getAllSpells()

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('incantation')
      expect(result[0]).toHaveProperty('effect')
      expect(result[0]).toHaveProperty('type')
    })
  })

  describe('findSpellByName', () => {
    beforeEach(() => {
      mockGet.mockResolvedValue(mockSpells)
    })

    it('should find spell by exact name match', async () => {
      const result = await findSpellByName('Expelliarmus')

      expect(mockGet).toHaveBeenCalledWith('/spells')
      expect(result).toEqual(mockSpells[0])
      expect(result?.name).toBe('Expelliarmus')
    })

    it('should find spell by case-insensitive name match', async () => {
      const result = await findSpellByName('EXPELLIARMUS')

      expect(result).toEqual(mockSpells[0])
      expect(result?.name).toBe('Expelliarmus')
    })

    it('should find spell by lowercase name', async () => {
      const result = await findSpellByName('wingardium leviosa')

      expect(result).toEqual(mockSpells[1])
      expect(result?.name).toBe('Wingardium Leviosa')
    })

    it('should find spell by incantation match', async () => {
      const result = await findSpellByName('Avada Kedavra')

      expect(result).toEqual(mockSpells[2])
      expect(result?.incantation).toBe('Avada Kedavra')
    })

    it('should find spell by case-insensitive incantation match', async () => {
      const result = await findSpellByName('avada kedavra')

      expect(result).toEqual(mockSpells[2])
      expect(result?.incantation).toBe('Avada Kedavra')
    })

    it('should return null when spell not found', async () => {
      const result = await findSpellByName('Abracadabra')

      expect(mockGet).toHaveBeenCalledWith('/spells')
      expect(result).toBeNull()
    })

    it('should return null when empty name provided', async () => {
      const result = await findSpellByName('')

      expect(result).toBeNull()
    })

    it('should handle partial name matches (should not match)', async () => {
      const result = await findSpellByName('Expel')

      expect(result).toBeNull()
    })

    it('should prioritize name match over incantation match', async () => {
      const spellWithDifferentNameAndIncantation: Spell = {
        id: 'spell4',
        name: 'Disarming Charm',
        incantation: 'Expelliarmus',
        effect: 'Disarms opponent',
        canBeVerbal: true,
        type: 'Charm',
        light: 'Red',
        creator: 'Unknown',
      }

      mockGet.mockResolvedValue([...mockSpells, spellWithDifferentNameAndIncantation])

      const result = await findSpellByName('Expelliarmus')
      expect(result?.name).toBe('Expelliarmus')
    })

    it('should handle API errors gracefully', async () => {
      const error = new Error('API Error')
      mockGet.mockRejectedValue(error)

      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const result = await findSpellByName('Expelliarmus')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching spell by name:', error)

      consoleSpy.mockRestore()
    })

    it('should trim whitespace from spell names', async () => {
      const result = await findSpellByName('  Expelliarmus  ')

      expect(result).toEqual(mockSpells[0])
    })

    it('should handle spells with empty incantations', async () => {
      const nonVerbalSpell: Spell = {
        id: 'spell5',
        name: 'Silent Spell',
        incantation: '',
        effect: 'Non-verbal effect',
        canBeVerbal: false,
        type: 'Charm',
        light: 'None',
        creator: 'Unknown',
      }

      mockGet.mockResolvedValue([nonVerbalSpell])

      const result = await findSpellByName('Silent Spell')

      expect(result).toEqual(nonVerbalSpell)
      expect(result?.incantation).toBe('')
    })
  })

  describe('Integration scenarios', () => {
    it('should handle complex spell data structure', async () => {
      const complexSpell: Spell = {
        id: 'complex1',
        name: 'Protean Charm',
        incantation: 'Proteus',
        effect: 'Causes copies of an object to be changed when the original is changed',
        canBeVerbal: true,
        type: 'Charm',
        light: 'Purple',
        creator: 'Hermione Granger',
      }

      mockGet.mockResolvedValue([complexSpell])

      const allResult = await getAllSpells()
      const findResult = await findSpellByName('Protean Charm')

      expect(allResult).toEqual([complexSpell])
      expect(findResult).toEqual(complexSpell)
      expect(findResult?.creator).toBe('Hermione Granger')
    })

    it('should handle spells with various types', async () => {
      const variousSpells: Spell[] = [
        { ...mockSpells[0], type: 'Charm' },
        { ...mockSpells[1], type: 'Transfiguration' },
        { ...mockSpells[2], type: 'Curse' },
      ]

      mockGet.mockResolvedValue(variousSpells)

      const result = await getAllSpells()

      expect(result.map(spell => spell.type)).toEqual(['Charm', 'Transfiguration', 'Curse'])
    })

    it('should handle empty response from API', async () => {
      mockGet.mockResolvedValue([])

      const allResult = await getAllSpells()
      const findResult = await findSpellByName('Any Spell')

      expect(allResult).toEqual([])
      expect(findResult).toBeNull()
    })
  })
})
