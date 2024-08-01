import queryClient from '@api/queryClient'
import {
  STORAGE_CONFIG_KEYS,
  type StorageConfig,
  type StorageConfigItem,
  type StorageConfigKey,
} from '@models/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import { parseJSONToObject } from '@tools/common'

export const CONFIG_QUERY_KEY = ['global_storage_config']

const clearStorage = async () => {
  await AsyncStorage.clear()
  queryClient.refetchQueries({ queryKey: CONFIG_QUERY_KEY })
}

const setStorageConfigValues = async (items: StorageConfigItem[]) => {
  for (const { key, value } of items) {
    await AsyncStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
    )
  }

  await queryClient.refetchQueries({ queryKey: CONFIG_QUERY_KEY })
}

const removeStorageConfigValues = async (keys: StorageConfigKey[]) => {
  for (const key of keys) {
    await AsyncStorage.removeItem(key)
  }

  queryClient.refetchQueries({ queryKey: CONFIG_QUERY_KEY })
}

const getStorageConfigValues = <TKeys extends keyof StorageConfig>(
  keys: TKeys[],
): Record<TKeys, StorageConfig[TKeys]> => {
  let values: StorageConfig = {}

  const data = queryClient.getQueryData<StorageConfig>(CONFIG_QUERY_KEY)

  for (const key of keys) {
    values = { ...values, [key]: data?.[key] }
  }

  return values
}

const queryFn = async () => {
  const textValues = await AsyncStorage.multiGet(
    STORAGE_CONFIG_KEYS as string[],
  )
  const configValues = Object.fromEntries(textValues)

  let data = configValues

  for (const key in configValues) {
    data = { ...data, [key]: parseJSONToObject(configValues[key]) }
  }

  return data
}

export const useStorageConfig = () => {
  const query = useQuery<StorageConfig>({
    queryKey: CONFIG_QUERY_KEY,
    queryFn: queryFn,
    networkMode: 'always',
  })

  return query
}

export default {
  setStorageConfigValues,
  removeStorageConfigValues,
  getStorageConfigValues,
  clearStorage,
}
