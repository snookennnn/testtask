import { config } from '@hooks'
import type { CharacterShortData } from '@models/characters'
import type { Gender, GenderRecalculation } from '@models/stores'
import type { RootStore } from '@stores/RootStore'
import { makeAutoObservable } from 'mobx'

const INIT_GENDER_RECALCULATION: GenderRecalculation = {
  female: 0,
  male: 0,
  others: 0,
}

const EXCEPTION_OTHER_GENDER: Gender[] = ['female', 'male']

export default class FavoritesStore {
  rootStore: RootStore
  characters: CharacterShortData[]
  genderRecalculation: GenderRecalculation

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.characters = []
    this.genderRecalculation = INIT_GENDER_RECALCULATION
    makeAutoObservable(this)
  }

  private reduceGenders = (
    sum: number,
    character: CharacterShortData,
    gender: Gender,
  ) => {
    const condition =
      gender === 'others'
        ? !EXCEPTION_OTHER_GENDER.includes(character.gender as Gender)
        : character.gender === gender

    return sum + Number(condition)
  }

  private sumCharactersByGender = (gender: Gender) =>
    this.characters.reduce(
      (sum, character) => this.reduceGenders(sum, character, gender),
      0,
    )

  private updateGenderRecalculation = () => {
    this.genderRecalculation.female = this.sumCharactersByGender('female')
    this.genderRecalculation.male = this.sumCharactersByGender('male')
    this.genderRecalculation.others = this.sumCharactersByGender('others')
  }

  updateFavoriteCharacters = async (favorite: CharacterShortData) => {
    const present = this.characters.some(
      character => character.url === favorite.url,
    )

    if (present) {
      this.characters = this.characters.filter(
        character => character.url !== favorite.url,
      )
    } else {
      this.characters = [{ ...favorite, favorite: true }, ...this.characters]
    }

    this.updateGenderRecalculation()

    await config.setStorageConfigValues([
      { key: 'favorite_characters', value: this.characters },
    ])
  }

  clearAll = () => {
    this.characters = []
    this.genderRecalculation = INIT_GENDER_RECALCULATION
    config.removeStorageConfigValues(['favorite_characters'])
  }

  loadFromStorageData = () => {
    const storage = config.getStorageConfigValues(['favorite_characters'])

    if (storage.favorite_characters?.length) {
      this.characters = storage.favorite_characters
      this.updateGenderRecalculation()
    }
  }
}
