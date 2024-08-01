import httpClient from '@api/httpClient'
import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
  type QueryFunction,
} from '@tanstack/react-query'
import ms from 'ms'
import type { FC } from 'react'
import { Alert } from 'react-native'

const ERROR_503 = 'Response not successful: Received status code 503' as const

const defaultQueryFunction: QueryFunction = async ({ queryKey }) =>
  httpClient.get(queryKey.join('/')).then(resp => resp.data)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
      gcTime: ms('1d'),
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
    },
    mutations: {
      onError: (error, _data, rollback) => {
        if (error instanceof Error) {
          if (error.message === ERROR_503) {
            Alert.alert('Something went wrong with data')
          } else {
            Alert.alert(error.message)
          }
        }

        if (rollback && typeof rollback === 'function') {
          rollback()
        }

        console.error(error)
      },
    },
  },
})

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient })
  })
}

export const QueryClientProvider: FC<{ children: any }> = ({ children }) => (
  <BaseQueryClientProvider client={queryClient}>
    {children}
  </BaseQueryClientProvider>
)

export default queryClient
