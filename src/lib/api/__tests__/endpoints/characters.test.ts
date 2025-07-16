import { getAllCharacters, findCharacterByName } from '../../endpoints/characters'
import { Character } from '@/types'
import * as client from '../../client'

// Mock the client module
jest.mock('../../client', () => ({
  get: jest.fn(),
}))

const mockGet = client.get as jest.MockedFunction<typeof client.get>

describe('Characters API Endpoints', () => {
  const mockCharacters: Character[] = [
    {
      id: 'character1',
      name: 'Harry Potter',
      alternate_names: ['The Boy Who Lived'],
      species: 'human',
      gender: 'male',
      house: 'Gryffindor',
      dateOfBirth: '31-07-1980',
      yearOfBirth: 1980,
      wizard: true,
      ancestry: 'half-blood',
      eyeColour: 'green',
      hairColour: 'black',
      wand: { wood: 'holly', core: 'phoenix feather', length: 11 },
      patronus: 'stag',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Daniel Radcliffe',
      alternate_actors: [],
      alive: true,
      image: 'https://example.com/harry.jpg',
    },
    {
      id: 'character2',
      name: 'Hermione Granger',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Gryffindor',
      dateOfBirth: '19-09-1979',
      yearOfBirth: 1979,
      wizard: true,
      ancestry: 'muggleborn',
      eyeColour: 'brown',
      hairColour: 'brown',
      wand: { wood: 'vine', core: 'dragon heartstring', length: 10.75 },
      patronus: 'otter',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Emma Watson',
      alternate_actors: [],
      alive: true,
      image: 'https://example.com/hermione.jpg',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllCharacters', () => {
    it('should fetch all characters', async () => {
      mockGet.mockResolvedValue(mockCharacters)

      const result = await getAllCharacters()

      expect(mockGet).toHaveBeenCalledWith('/characters')
      expect(result).toEqual(mockCharacters)
      expect(result).toHaveLength(2)
    })

    it('should propagate errors from client', async () => {
      const error = new Error('Network error')
      mockGet.mockRejectedValue(error)

      await expect(getAllCharacters()).rejects.toThrow('Network error')
      expect(mockGet).toHaveBeenCalledWith('/characters')
    })

    it('should return empty array when no characters found', async () => {
      mockGet.mockResolvedValue([])

      const result = await getAllCharacters()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })
  })

  describe('findCharacterByName', () => {
    beforeEach(() => {
      mockGet.mockResolvedValue(mockCharacters)
    })

    it('should find character by exact name match', async () => {
      const result = await findCharacterByName('Harry Potter')

      expect(mockGet).toHaveBeenCalledWith('/characters')
      expect(result).toEqual(mockCharacters[0])
      expect(result?.name).toBe('Harry Potter')
    })

    it('should find character by case-insensitive name match', async () => {
      const result = await findCharacterByName('HARRY POTTER')

      expect(result).toEqual(mockCharacters[0])
      expect(result?.name).toBe('Harry Potter')
    })

    it('should find character by lowercase name', async () => {
      const result = await findCharacterByName('hermione granger')

      expect(result).toEqual(mockCharacters[1])
      expect(result?.name).toBe('Hermione Granger')
    })

    it('should return null when character not found', async () => {
      const result = await findCharacterByName('Voldemort')

      expect(mockGet).toHaveBeenCalledWith('/characters')
      expect(result).toBeNull()
    })

    it('should return null when empty name provided', async () => {
      const result = await findCharacterByName('')

      expect(result).toBeNull()
    })

    it('should handle partial name matches (should not match)', async () => {
      const result = await findCharacterByName('Harry')

      expect(result).toBeNull()
    })

    it('should handle API errors', async () => {
      const error = new Error('API Error')
      mockGet.mockRejectedValue(error)

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const result = await findCharacterByName('Harry Potter')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching character by name:', error)

      consoleSpy.mockRestore()
    })

    it('should trim whitespace from character names', async () => {
      const result = await findCharacterByName('  Harry Potter  ')

      expect(result).toEqual(mockCharacters[0])
    })
  })

  describe('Integration scenarios', () => {
    it('should handle complex character data structure', async () => {
      const complexCharacter: Character = {
        id: 'complex1',
        name: 'Albus Dumbledore',
        alternate_names: ['Professor Dumbledore', 'Dumbledore'],
        species: 'human',
        gender: 'male',
        house: 'Gryffindor',
        dateOfBirth: '',
        yearOfBirth: null,
        wizard: true,
        ancestry: 'half-blood',
        eyeColour: 'blue',
        hairColour: 'silver',
        wand: { wood: 'elder', core: 'thestral tail hair', length: 15 },
        patronus: 'phoenix',
        hogwartsStudent: false,
        hogwartsStaff: true,
        actor: 'Richard Harris',
        alternate_actors: ['Michael Gambon'],
        alive: false,
        image: 'https://example.com/dumbledore.jpg',
      }

      mockGet.mockResolvedValue([complexCharacter])

      const allResult = await getAllCharacters()
      const findResult = await findCharacterByName('Albus Dumbledore')

      expect(allResult).toEqual([complexCharacter])
      expect(findResult).toEqual(complexCharacter)
    })

    it('should handle empty response from API', async () => {
      mockGet.mockResolvedValue([])

      const allResult = await getAllCharacters()
      const findResult = await findCharacterByName('Any Character')

      expect(allResult).toEqual([])
      expect(findResult).toBeNull()
    })
  })
})
