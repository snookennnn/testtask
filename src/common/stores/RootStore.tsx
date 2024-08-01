import { configure } from 'mobx'
import React, { createContext, useContext, type FC } from 'react'
import FavoritesStore from './FavoritesStore'

export class RootStore {
  favoritesStore: FavoritesStore

  constructor() {
    configure({ enforceActions: 'always' })
    this.favoritesStore = new FavoritesStore(this)
  }
}

export const StoreContext = createContext(new RootStore())

const store = new RootStore()

export const StoreProvider: FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
export default useStore
