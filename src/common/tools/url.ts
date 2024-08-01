import queryClient from '@api/queryClient'
import axios from 'axios'
import Config from 'react-native-config'
import { charactersKeys } from '../api/resources/characters/constants'
import { REG_URL, asyncMap } from './common'

export type Key = keyof typeof charactersKeys
export type APIKey = Exclude<Key, 'root'>

export const fetchArrayOfUrl = async <TData>(
  apiKey: APIKey,
  urls: string[],
) => {
  return asyncMap(urls, url => fetchDataOfUrl<TData>(apiKey, url))
}

export const fetchDataOfUrl = async <TData>(apiKey: APIKey, url: string) => {
  const queryKey = charactersKeys[apiKey](url)
  const queryData = queryClient.getQueryData<TData>(queryKey)

  if (queryData) {
    return queryData
  }

  const newQueryData = await queryClient.fetchQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<TData>(url)
      return response.data
    },
  })

  return newQueryData
}

export const isBaseUrlOfApi = (url: string) =>
  REG_URL.test(url) && url.includes(Config.API_URL)
