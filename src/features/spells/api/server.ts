import { Spell, PaginatedResponse } from '@/features/ui/types/api'

const HP_API_BASE = process.env.NEXT_PUBLIC_HP_API_BASE || 'https://hp-api.onrender.com/api'

export async function getAllSpellsServer(): Promise<Spell[]> {
  try {
    const response = await fetch(`${HP_API_BASE}/spells`, {
      next: {
        revalidate: 21600,
        tags: ['spells-base'],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch spells: ${response.status}`)
    }

    const spells = await response.json()
    console.log(`HP API: ${spells?.length || 0} spells loaded`)
    return spells || []
  } catch (error) {
    console.error('Error fetching spells from server:', error)
    return []
  }
}

interface GetSpellsPaginatedParams {
  page?: number
  limit?: number
  search?: string
}

function processSpellsData(
  spells: Spell[],
  params: GetSpellsPaginatedParams
): PaginatedResponse<Spell> {
  const { page = 1, limit = 10, search = '' } = params

  const filteredSpells = search.trim()
    ? spells.filter(
        spell =>
          spell.name?.toLowerCase().includes(search.toLowerCase()) ||
          spell.description?.toLowerCase().includes(search.toLowerCase())
      )
    : spells

  const totalItems = filteredSpells.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedSpells = filteredSpells.slice(startIndex, endIndex)

  return {
    data: paginatedSpells,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}

export async function getSpellsPaginatedServer({
  page = 1,
  limit = 10,
  search = '',
}: GetSpellsPaginatedParams = {}): Promise<PaginatedResponse<Spell>> {
  try {
    const allSpells = await getAllSpellsServer()

    const result = processSpellsData(allSpells, { page, limit, search })

    return result
  } catch (error) {
    console.error('Error in getSpellsPaginatedServer:', error)
    return {
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }
  }
}
