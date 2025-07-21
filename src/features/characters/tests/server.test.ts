import { getAllCharactersServer, getCharacterByNameServer } from '../api/server'

const mockCharacters = [
  { id: '1', name: 'Harry Potter', house: 'Gryffindor' },
  { id: '2', name: 'Hermione Granger', house: 'Gryffindor' },
]

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockCharacters,
  }) as any
})

afterAll(() => {
  jest.resetAllMocks()
})

describe('Characters API (server)', () => {
  it('should fetch all characters', async () => {
    const result = await getAllCharactersServer()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  it('should return null for non-existent character', async () => {
    const result = await getCharacterByNameServer('NonExistentCharacter')
    expect(result).toBeNull()
  })
})
