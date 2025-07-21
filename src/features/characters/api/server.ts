import { Character, PaginatedResponse } from '@/features/ui/types/api'

const HP_API_BASE = process.env.NEXT_PUBLIC_HP_API_BASE || 'https://hp-api.onrender.com/api'

export async function getAllCharactersServer(): Promise<Character[]> {
  try {
    const response = await fetch(`${HP_API_BASE}/characters`, {
      next: {
        revalidate: 21600,
        tags: ['characters-base'],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.status}`)
    }

    const characters = await response.json()
    console.log(`HP API: ${characters?.length || 0} characters loaded`)
    return characters || []
  } catch (error) {
    console.error('Error fetching characters from server:', error)
    return []
  }
}

export async function getCharactersByHouseServer(house: string): Promise<Character[]> {
  try {
    const response = await fetch(`${HP_API_BASE}/characters/house/${house}`, {
      next: {
        revalidate: 3600,
        tags: ['characters-base', `house-${house}`],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${house} characters: ${response.status}`)
    }

    const characters = await response.json()
    return characters || []
  } catch (error) {
    console.error(`Error fetching ${house} characters from server:`, error)
    return []
  }
}

interface GetCharactersPaginatedParams {
  page?: number
  limit?: number
  search?: string
  filter?: 'students' | 'staff' | ''
}

function processCharactersData(
  characters: Character[],
  params: GetCharactersPaginatedParams
): PaginatedResponse<Character> {
  const { page = 1, limit = 10, search = '', filter = '' } = params

  const filteredCharacters = characters
    .filter(char => {
      if (filter === 'students') return char.hogwartsStudent
      if (filter === 'staff') return char.hogwartsStaff
      return true
    })
    .filter(char => {
      if (!search.trim()) return true
      const searchLower = search.toLowerCase()
      return (
        char.name?.toLowerCase().includes(searchLower) ||
        char.actor?.toLowerCase().includes(searchLower) ||
        char.alternate_names?.some(name => name.toLowerCase().includes(searchLower))
      )
    })

  const totalItems = filteredCharacters.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex)

  return {
    data: paginatedCharacters,
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

export async function getCharactersPaginatedServer({
  page = 1,
  limit = 10,
  search = '',
  filter = '',
}: GetCharactersPaginatedParams = {}): Promise<PaginatedResponse<Character>> {
  try {
    const allCharacters = await getAllCharactersServer()
    const result = processCharactersData(allCharacters, { page, limit, search, filter })
    return result
  } catch (error) {
    console.error('Error in getCharactersPaginatedServer:', error)
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

export async function getCharacterBySlugServer(slug: string): Promise<Character | null> {
  try {
    const characters = await getAllCharactersServer()
    const searchName = slug.replace(/-/g, ' ')
    const character = characters.find(char => char.name?.toLowerCase() === searchName.toLowerCase())
    return character || null
  } catch (error) {
    console.error('Error fetching character by slug:', error)
    return null
  }
}

export async function getCharacterByNameServer(name: string): Promise<Character | null> {
  try {
    console.log(`Fetching character: ${name}`)
    const allCharacters = await getAllCharactersServer()
    const character = allCharacters.find(
      char =>
        char.name?.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase() ||
        char.name?.toLowerCase() === name.toLowerCase()
    )
    if (character) {
      console.log(`Character found: ${character.name}`)
      return character
    }
    console.log(`Character not found: ${name}`)
    return null
  } catch (error) {
    console.error(`Error fetching character ${name}:`, error)
    return null
  }
}

export async function getAllCharacterSlugs(): Promise<string[]> {
  try {
    const characters = await getAllCharactersServer()
    return characters
      .filter(char => char.name)
      .map(char => char.name.toLowerCase().replace(/\s+/g, '-'))
  } catch (error) {
    console.error('Error generating character slugs:', error)
    return []
  }
}
