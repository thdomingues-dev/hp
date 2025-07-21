export interface Character {
  id: string
  name: string
  alternate_names: string[]
  species: string
  gender: string
  house: string
  dateOfBirth: string | null
  yearOfBirth: number | null
  wizard: boolean
  ancestry: string
  eyeColour: string
  hairColour: string
  wand: {
    wood: string | null
    core: string | null
    length: number | null
  }
  patronus: string
  hogwartsStudent: boolean
  hogwartsStaff: boolean
  actor: string
  alternate_actors: string[]
  alive: boolean
  image: string
}

export type HouseName = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw'

export interface House {
  id: string
  name: HouseName
  founder: string
  houseColours: string
  animal: string
  element: string
  traits: string[]
  description: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}
export interface Spell {
  id: string
  name: string
  description: string
}

export type CharacterFilter = 'all' | 'students' | 'staff'
