import {
  getAllCharacters,
  findCharacterByName,
  getAllHouses,
  findHouseByName,
  getAllSpells,
  findSpellByName,
} from '../index'
import * as client from '../client'

// Mock the client module
jest.mock('../client', () => ({
  get: jest.fn(),
}))

const mockGet = client.get as jest.MockedFunction<typeof client.get>

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Character API Integration', () => {
    it('should fetch and find characters correctly', async () => {
      const mockCharacters = [
        {
          id: '1',
          name: 'Harry Potter',
          alternate_names: [],
          species: 'human',
          gender: 'male',
          house: 'Gryffindor',
          dateOfBirth: '',
          yearOfBirth: 1980,
          wizard: true,
          ancestry: '',
          eyeColour: '',
          hairColour: '',
          wand: { wood: '', core: '', length: 0 },
          patronus: '',
          hogwartsStudent: true,
          hogwartsStaff: false,
          actor: '',
          alternate_actors: [],
          alive: true,
          image: '',
        },
      ]

      mockGet.mockResolvedValue(mockCharacters)

      const allCharacters = await getAllCharacters()
      expect(allCharacters).toEqual(mockCharacters)

      const foundCharacter = await findCharacterByName('Harry Potter')
      expect(foundCharacter).toEqual(mockCharacters[0])

      const notFound = await findCharacterByName('Non-existent')
      expect(notFound).toBeNull()
    })
  })

  describe('House API Integration', () => {
    it('should fetch and find houses correctly', async () => {
      const mockHouses = [
        {
          id: '1',
          name: 'Gryffindor',
          houseColours: 'red and gold',
          founder: 'Godric Gryffindor',
          animal: 'lion',
          element: 'fire',
          ghost: '',
          commonRoom: '',
          heads: [],
          traits: [],
        },
      ]

      mockGet.mockResolvedValue(mockHouses)

      const allHouses = await getAllHouses()
      expect(allHouses).toEqual(mockHouses)

      const foundHouse = await findHouseByName('Gryffindor')
      expect(foundHouse).toEqual(mockHouses[0])
    })
  })

  describe('Spell API Integration', () => {
    it('should fetch and find spells correctly', async () => {
      const mockSpells = [
        {
          id: '1',
          name: 'Expelliarmus',
          incantation: 'Expelliarmus',
          effect: 'Disarms opponent',
          canBeVerbal: true,
          type: 'Charm',
          light: 'Red',
          creator: 'Unknown',
        },
      ]

      mockGet.mockResolvedValue(mockSpells)

      const allSpells = await getAllSpells()
      expect(allSpells).toEqual(mockSpells)

      const foundSpell = await findSpellByName('Expelliarmus')
      expect(foundSpell).toEqual(mockSpells[0])
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      mockGet.mockRejectedValue(new Error('API Error'))

      // Mock console to avoid noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const character = await findCharacterByName('Test')
      const house = await findHouseByName('Test')
      const spell = await findSpellByName('Test')

      expect(character).toBeNull()
      expect(house).toBeNull()
      expect(spell).toBeNull()

      consoleSpy.mockRestore()
    })
  })
})
