import { getAllHousesServer, getHouseWithCharactersServer } from '../api/server'

describe('Houses API (server)', () => {
  it('should fetch all houses (array)', async () => {
    const result = await getAllHousesServer()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(4)
  })

  it('should return house and characters for Gryffindor', async () => {
    const { house, characters } = await getHouseWithCharactersServer('Gryffindor')
    expect(house?.name).toBe('Gryffindor')
    expect(Array.isArray(characters)).toBe(true)
  })
})
