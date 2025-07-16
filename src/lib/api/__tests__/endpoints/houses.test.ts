import { getAllHouses, findHouseByName } from '../../endpoints/houses'
import { House } from '@/types'
import * as client from '../../client'

// Mock the client module
jest.mock('../../client', () => ({
  get: jest.fn(),
}))

const mockGet = client.get as jest.MockedFunction<typeof client.get>

describe('Houses API Endpoints', () => {
  const mockHouses: House[] = [
    {
      id: 'house1',
      name: 'Gryffindor',
      houseColours: 'red and gold',
      founder: 'Godric Gryffindor',
      animal: 'lion',
      element: 'fire',
      ghost: 'Nearly Headless Nick',
      commonRoom: 'Gryffindor Tower',
      heads: [{ id: 'head1', firstName: 'Minerva', lastName: 'McGonagall' }],
      traits: [
        { id: 'trait1', name: 'courage' },
        { id: 'trait2', name: 'bravery' },
      ],
    },
    {
      id: 'house2',
      name: 'Slytherin',
      houseColours: 'green and silver',
      founder: 'Salazar Slytherin',
      animal: 'serpent',
      element: 'water',
      ghost: 'The Bloody Baron',
      commonRoom: 'Slytherin Dungeon',
      heads: [{ id: 'head2', firstName: 'Severus', lastName: 'Snape' }],
      traits: [
        { id: 'trait3', name: 'ambition' },
        { id: 'trait4', name: 'cunning' },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllHouses', () => {
    it('should fetch all houses', async () => {
      mockGet.mockResolvedValue(mockHouses)

      const result = await getAllHouses()

      expect(mockGet).toHaveBeenCalledWith('/houses')
      expect(result).toEqual(mockHouses)
      expect(result).toHaveLength(2)
    })

    it('should propagate errors from client', async () => {
      const error = new Error('Network error')
      mockGet.mockRejectedValue(error)

      await expect(getAllHouses()).rejects.toThrow('Network error')
      expect(mockGet).toHaveBeenCalledWith('/houses')
    })

    it('should return empty array when no houses found', async () => {
      mockGet.mockResolvedValue([])

      const result = await getAllHouses()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle response with proper house structure', async () => {
      mockGet.mockResolvedValue(mockHouses)

      const result = await getAllHouses()

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('houseColours')
      expect(result[0]).toHaveProperty('founder')
      expect(result[0]).toHaveProperty('animal')
      expect(result[0]).toHaveProperty('element')
    })
  })

  describe('findHouseByName', () => {
    beforeEach(() => {
      mockGet.mockResolvedValue(mockHouses)
    })

    it('should find house by exact name match', async () => {
      const result = await findHouseByName('Gryffindor')

      expect(mockGet).toHaveBeenCalledWith('/houses')
      expect(result).toEqual(mockHouses[0])
      expect(result?.name).toBe('Gryffindor')
    })

    it('should find house by case-insensitive name match', async () => {
      const result = await findHouseByName('GRYFFINDOR')

      expect(result).toEqual(mockHouses[0])
      expect(result?.name).toBe('Gryffindor')
    })

    it('should find house by lowercase name', async () => {
      const result = await findHouseByName('slytherin')

      expect(result).toEqual(mockHouses[1])
      expect(result?.name).toBe('Slytherin')
    })

    it('should return null when house not found', async () => {
      const result = await findHouseByName('Ilvermorny')

      expect(mockGet).toHaveBeenCalledWith('/houses')
      expect(result).toBeNull()
    })

    it('should return null when empty name provided', async () => {
      const result = await findHouseByName('')

      expect(result).toBeNull()
    })

    it('should handle partial name matches (should not match)', async () => {
      const result = await findHouseByName('Gryff')

      expect(result).toBeNull()
    })

    it('should handle API errors gracefully', async () => {
      const error = new Error('API Error')
      mockGet.mockRejectedValue(error)

      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const result = await findHouseByName('Gryffindor')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching house by name:', error)

      consoleSpy.mockRestore()
    })

    it('should trim whitespace from house names', async () => {
      const result = await findHouseByName('  Gryffindor  ')

      expect(result).toEqual(mockHouses[0])
    })

    it('should handle all four Hogwarts houses', async () => {
      const allHouses: House[] = [
        { ...mockHouses[0], name: 'Gryffindor' },
        { ...mockHouses[1], name: 'Slytherin' },
        { ...mockHouses[0], id: 'house3', name: 'Hufflepuff', houseColours: 'yellow and black' },
        { ...mockHouses[0], id: 'house4', name: 'Ravenclaw', houseColours: 'blue and bronze' },
      ]

      mockGet.mockResolvedValue(allHouses)

      const gryffindor = await findHouseByName('Gryffindor')
      const slytherin = await findHouseByName('Slytherin')
      const hufflepuff = await findHouseByName('Hufflepuff')
      const ravenclaw = await findHouseByName('Ravenclaw')

      expect(gryffindor?.name).toBe('Gryffindor')
      expect(slytherin?.name).toBe('Slytherin')
      expect(hufflepuff?.name).toBe('Hufflepuff')
      expect(ravenclaw?.name).toBe('Ravenclaw')
    })
  })

  describe('Integration scenarios', () => {
    it('should handle complex house data structure', async () => {
      const complexHouse: House = {
        id: 'complex1',
        name: 'Ravenclaw',
        houseColours: 'blue and bronze',
        founder: 'Rowena Ravenclaw',
        animal: 'eagle',
        element: 'air',
        ghost: 'The Grey Lady',
        commonRoom: 'Ravenclaw Tower',
        heads: [
          { id: 'head3', firstName: 'Filius', lastName: 'Flitwick' },
          { id: 'head4', firstName: 'Aurora', lastName: 'Sinistra' },
        ],
        traits: [
          { id: 'trait5', name: 'intelligence' },
          { id: 'trait6', name: 'wisdom' },
          { id: 'trait7', name: 'wit' },
        ],
      }

      mockGet.mockResolvedValue([complexHouse])

      const allResult = await getAllHouses()
      const findResult = await findHouseByName('Ravenclaw')

      expect(allResult).toEqual([complexHouse])
      expect(findResult).toEqual(complexHouse)
      expect(findResult?.heads).toHaveLength(2)
      expect(findResult?.traits).toHaveLength(3)
    })

    it('should handle empty response from API', async () => {
      mockGet.mockResolvedValue([])

      const allResult = await getAllHouses()
      const findResult = await findHouseByName('Any House')

      expect(allResult).toEqual([])
      expect(findResult).toBeNull()
    })
  })
})
