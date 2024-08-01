import type { Film } from './films'
import type { Homeworld } from './homeworld'
import type { Specie } from './species'
import type { Starship } from './starships'
import type { Vehicle } from './vehicles'

// #region Response Data
export type CharactersResponseData = {
  count: number
  next: string | null // url
  previous: string | null // url
  results: CharacterResponseData[]
}

export type CharacterUrlsResponseData = {
  homeworld: string // url
  films: string[] // urls
  species: string[] // urls
  vehicles: string[] // urls
  starships: string[] // urls
}

export type CharacterResponseData = CharacterBaseInfo &
  CharacterUrlsResponseData

export type CharacterListResponseData = {
  count: number
  hasNextPage: boolean
  characters: CharacterShortData[]
}

// #endregion

export type CharacterBaseInfo = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  url: string // url
}

export type CharacterExtraInfo = {
  homeworld: Homeworld
  films: Film[]
  species: Specie[]
  vehicles: Vehicle[]
  starships: Starship[]
}

export type Character = CharacterBaseInfo & CharacterExtraInfo

export type CharacterShortData = Pick<
  Character,
  'name' | 'birth_year' | 'gender' | 'url'
> & {
  homeworldName: Character['homeworld']['name']
  favorite: boolean
}
