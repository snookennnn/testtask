import type { Character } from '@models/characters'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import charactersApi from './actions'
import { charactersKeys } from './constants'

const useCharacterQuery = (url: string) => {
  const query = useQuery<Character | null, AxiosError>({
    queryKey: charactersKeys.person(url),
    queryFn: () => charactersApi.getCharacter(url),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return query
}

export default useCharacterQuery
