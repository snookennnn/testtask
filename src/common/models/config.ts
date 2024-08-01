import type { CharacterShortData } from './characters'

interface StorageConfigData {
  favorite_characters: CharacterShortData[]
}

export type StorageConfig = Partial<StorageConfigData>

export type StorageConfigKey = keyof StorageConfig

export interface StorageConfigItem {
  key: StorageConfigKey
  value: any
}

export const FAVORITE_CHARACTERS_CONFIG_KEY = 'favorite_characters' as const

export const STORAGE_CONFIG_KEYS: Readonly<StorageConfigKey[]> = [
  FAVORITE_CHARACTERS_CONFIG_KEY,
] as const
