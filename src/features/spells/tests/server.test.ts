import { getAllSpellsServer, getSpellsPaginatedServer } from '../api/server'

const mockSpells = [
  { id: '1', name: 'Expelliarmus', description: 'Disarms opponent' },
  { id: '2', name: 'Lumos', description: 'Creates light' },
  { id: '3', name: 'Alohomora', description: 'Opens locked objects' },
]

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockSpells,
  }) as any
})

afterAll(() => {
  jest.resetAllMocks()
})

describe('Spells API (server)', () => {
  it('should fetch all spells (array)', async () => {
    const result = await getAllSpellsServer()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(3)
  })

  it('should paginate spells', async () => {
    const { data, pagination } = await getSpellsPaginatedServer({ page: 1, limit: 2 })
    expect(Array.isArray(data)).toBe(true)
    expect(pagination.currentPage).toBe(1)
    expect(pagination.itemsPerPage).toBe(2)
    expect(data.length).toBe(2)
  })
})
