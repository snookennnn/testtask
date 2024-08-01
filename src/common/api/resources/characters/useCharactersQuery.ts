import type { CharacterListResponseData } from '@models/characters'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useMemo } from 'react'
import charactersApi from './actions'
import { INIT_PAGE, PAGE_ITERATION, charactersKeys } from './constants'

const useCharactersQuery = () => {
  const query = useInfiniteQuery<CharacterListResponseData, AxiosError>({
    queryKey: charactersKeys.root,
    queryFn: ({ pageParam }) =>
      charactersApi.getCharacters(pageParam as typeof INIT_PAGE),
    getNextPageParam: (lastPage, allPage) =>
      lastPage.hasNextPage ? allPage.length + PAGE_ITERATION : undefined,
    initialPageParam: INIT_PAGE,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const data = useMemo<CharacterListResponseData>(() => {
    if (!query.data?.pages) {
      return {
        characters: [],
        count: 0,
        hasNextPage: false,
      }
    }

    const pages = query.data.pages
    const lastPage = pages[pages.length - 1]

    return {
      characters: pages.flatMap(page => page.characters),
      count: lastPage.count,
      hasNextPage: lastPage.hasNextPage,
    }
  }, [query.data?.pages])

  return { ...query, data }
}

export default useCharactersQuery
