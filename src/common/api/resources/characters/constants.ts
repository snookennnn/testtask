export const charactersKeys = {
  root: ['characters'] as const,
  person: (url: string) => ['character', url] as const,
  homeworld: (url: string) => ['homeworld', url] as const,
  film: (url: string) => ['film', url] as const,
  specie: (url: string) => ['specie', url] as const,
  vehicle: (url: string) => ['vehicle', url] as const,
  starship: (url: string) => ['starship', url] as const,
}

export const charactersUrls = {
  root: (page: number) => ['people', `?page=${page}`],
}

export const INIT_PAGE: number = 1
export const PAGE_ITERATION: number = 1
