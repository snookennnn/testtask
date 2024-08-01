import httpClient from '@api/httpClient'
import type {
  Character,
  CharacterListResponseData,
  CharacterResponseData,
  CharacterShortData,
  CharactersResponseData,
} from '@models/characters'
import type { Film } from '@models/films'
import type { Homeworld } from '@models/homeworld'
import type { Specie } from '@models/species'
import type { Starship } from '@models/starships'
import type { Vehicle } from '@models/vehicles'
import { asyncMap, keyToUrl } from '@tools/common'
import { fetchArrayOfUrl, fetchDataOfUrl, isBaseUrlOfApi } from '@tools/url'
import axios from 'axios'
import { INIT_PAGE, charactersUrls } from './constants'

const getCharacters = async (
  pageParam: number = INIT_PAGE,
): Promise<CharacterListResponseData> => {
  const response = await httpClient.get<CharactersResponseData>(
    keyToUrl(charactersUrls.root(pageParam)),
  )

  const characters = await asyncMap<CharacterResponseData, CharacterShortData>(
    response.data.results,
    async item => {
      const homeworld = await fetchDataOfUrl<Homeworld>(
        'homeworld',
        item.homeworld,
      )

      return {
        birth_year: item.birth_year,
        favorite: false,
        gender: item.gender,
        homeworldName: homeworld.name,
        name: item.name,
        url: item.url,
      }
    },
  )

  return {
    characters,
    count: response.data.count,
    hasNextPage: !!response.data.next,
  }
}

const getCharacter = async (url: string): Promise<Character | null> => {
  if (!isBaseUrlOfApi(url)) return null

  const { data: character } = await axios.get<CharacterResponseData>(url)
  const [films, homeworld, species, starships, vehicles] = await Promise.all([
    fetchArrayOfUrl<Film>('film', character.films),
    fetchDataOfUrl<Homeworld>('homeworld', character.homeworld),
    fetchArrayOfUrl<Specie>('specie', character.species),
    fetchArrayOfUrl<Starship>('starship', character.starships),
    fetchArrayOfUrl<Vehicle>('vehicle', character.vehicles),
  ])

  return { ...character, films, homeworld, species, starships, vehicles }
}

export default {
  getCharacter,
  getCharacters,
}
