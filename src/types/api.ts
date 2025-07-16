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

export interface House {
  id: string
  name: string
  houseColours: string
  founder: string
  animal: string
  element: string
  ghost: string
  commonRoom: string
  heads: Array<{
    id: string
    firstName: string
    lastName: string
  }>
  traits: Array<{
    id: string
    name: string
  }>
}

export interface Spell {
  id: string
  name: string
  incantation: string
  effect: string
  canBeVerbal: boolean
  type: string
  light: string
  creator: string
}

export type HouseName = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw'

export type CharacterFilter = 'all' | 'students' | 'staff'
