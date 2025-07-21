import { Character, House, HouseName } from '@/features/ui/types/api'

const HP_API_BASE = process.env.NEXT_PUBLIC_HP_API_BASE || 'https://hp-api.onrender.com/api'

export async function getAllHousesServer(): Promise<House[]> {
  return createFallbackHouses()
}

export async function getHouseCharactersServer(houseName: string): Promise<Character[]> {
  try {
    const response = await fetch(`${HP_API_BASE}/characters/house/${houseName}`, {
      next: {
        revalidate: 21600,
        tags: ['characters-base', `house-${houseName}`],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${houseName} characters: ${response.status}`)
    }

    const characters = await response.json()
    console.log(`HP API: ${characters?.length || 0} ${houseName} characters loaded`)
    return characters || []
  } catch (error) {
    console.error(`Error fetching ${houseName} characters from server:`, error)
    return []
  }
}

export async function getHouseWithCharactersServer(houseName: HouseName): Promise<{
  house: House | null
  characters: Character[]
}> {
  try {
    console.log(`Fetching house: ${houseName}`)

    const houses = await getAllHousesServer()
    const house = houses.find(h => h.name.toLowerCase() === houseName.toLowerCase())

    if (!house) {
      console.log(`House not found: ${houseName}`)
      return { house: null, characters: [] }
    }

    const characters = await getHouseCharactersServer(houseName)

    console.log(`House ${houseName}: ${characters.length} characters`)
    return { house, characters }
  } catch (error) {
    console.error(`Error fetching house ${houseName}:`, error)
    return { house: null, characters: [] }
  }
}

function createFallbackHouses(): House[] {
  const getHouseColors = (name: HouseName): string => {
    const colors: Record<HouseName, string> = {
      Gryffindor: 'Scarlet and gold',
      Slytherin: 'Green and silver',
      Hufflepuff: 'Yellow and black',
      Ravenclaw: 'Blue and bronze',
    }
    return colors[name]
  }

  const getHouseFounder = (name: HouseName): string => {
    const founders: Record<HouseName, string> = {
      Gryffindor: 'Godric Gryffindor',
      Slytherin: 'Salazar Slytherin',
      Hufflepuff: 'Helga Hufflepuff',
      Ravenclaw: 'Rowena Ravenclaw',
    }
    return founders[name]
  }

  const getHouseAnimal = (name: HouseName): string => {
    const animals: Record<HouseName, string> = {
      Gryffindor: 'Lion',
      Slytherin: 'Serpent',
      Hufflepuff: 'Badger',
      Ravenclaw: 'Eagle',
    }
    return animals[name]
  }

  const getHouseElement = (name: HouseName): string => {
    const elements: Record<HouseName, string> = {
      Gryffindor: 'Fire',
      Slytherin: 'Water',
      Hufflepuff: 'Earth',
      Ravenclaw: 'Air',
    }
    return elements[name]
  }

  const getHouseTraits = (name: HouseName): string[] => {
    const traits: Record<HouseName, string[]> = {
      Gryffindor: ['Courage', 'Bravery', 'Nerve', 'Chivalry'],
      Slytherin: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
      Hufflepuff: ['Loyalty', 'Patience', 'Fair Play', 'Kindness'],
      Ravenclaw: ['Intelligence', 'Wisdom', 'Wit', 'Learning'],
    }
    return traits[name]
  }

  const getHouseDescription = (name: HouseName): string => {
    const descriptions: Record<HouseName, string> = {
      Gryffindor: 'Gryffindor values courage, bravery, nerve, and chivalry.',
      Slytherin: 'Slytherin values ambition, cunning, leadership, and resourcefulness.',
      Hufflepuff: 'Hufflepuff values loyalty, patience, fair play, and kindness.',
      Ravenclaw: 'Ravenclaw values intelligence, wisdom, wit, and learning.',
    }
    return descriptions[name]
  }

  return [
    {
      id: '1',
      name: 'Gryffindor',
      houseColours: getHouseColors('Gryffindor'),
      founder: getHouseFounder('Gryffindor'),
      animal: getHouseAnimal('Gryffindor'),
      element: getHouseElement('Gryffindor'),
      traits: getHouseTraits('Gryffindor'),
      description: getHouseDescription('Gryffindor'),
    },
    {
      id: '2',
      name: 'Slytherin',
      houseColours: getHouseColors('Slytherin'),
      founder: getHouseFounder('Slytherin'),
      animal: getHouseAnimal('Slytherin'),
      element: getHouseElement('Slytherin'),
      traits: getHouseTraits('Slytherin'),
      description: getHouseDescription('Slytherin'),
    },
    {
      id: '3',
      name: 'Hufflepuff',
      houseColours: getHouseColors('Hufflepuff'),
      founder: getHouseFounder('Hufflepuff'),
      animal: getHouseAnimal('Hufflepuff'),
      element: getHouseElement('Hufflepuff'),
      traits: getHouseTraits('Hufflepuff'),
      description: getHouseDescription('Hufflepuff'),
    },
    {
      id: '4',
      name: 'Ravenclaw',
      houseColours: getHouseColors('Ravenclaw'),
      founder: getHouseFounder('Ravenclaw'),
      animal: getHouseAnimal('Ravenclaw'),
      element: getHouseElement('Ravenclaw'),
      traits: getHouseTraits('Ravenclaw'),
      description: getHouseDescription('Ravenclaw'),
    },
  ]
}
