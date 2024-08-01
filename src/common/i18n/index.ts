import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n, { type LanguageDetectorAsyncModule } from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'
import translationEN from './locales/en.json'

const CACHE_LANGUAGE_KEY = 'i18n_language'

const LANGUAGES = ['en'] as const

export const t = i18n.t.bind(i18n)

export const defaultNS = 'translation'

export type Language = (typeof LANGUAGES)[number]

export const FALLBACK_LANG: Language = 'en'

const cacheUserLanguage = async (lang: Language) => {
  await AsyncStorage.setItem(CACHE_LANGUAGE_KEY, lang)
}

export const getLanguage = () => {
  return i18n.language
}

export const changeLanguage = async (lang: Language) => {
  await i18n.changeLanguage(lang)
  await cacheUserLanguage(lang)
}

export const resources = {
  en: { translation: translationEN },
} as const

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async callback => {
    const language = await AsyncStorage.getItem(CACHE_LANGUAGE_KEY)

    if (language) {
      callback(language)
    } else {
      const bestLng = RNLocalize.findBestAvailableLanguage(LANGUAGES)
      callback(bestLng?.languageTag ?? FALLBACK_LANG)
    }
  },
  cacheUserLanguage,
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  })

export { default } from 'i18next'
