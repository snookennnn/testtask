import type { CharacterShortData } from '@models/characters'
import { useKeyboard } from '@react-native-community/hooks'
import { useNavigation } from '@react-navigation/native'
import type { RootStackScreenProps } from '@screens'
import { searchFilter } from '@screens/tools'
import useStore from '@stores'
import tw from '@tools/tailwind'
import { KeyboardAvoidingView, TextInput } from '@uikit/atoms'
import { CroppedButton } from '@uikit/atoms/buttons'
import { FansCounter } from '@uikit/molecules'
import { CharacterList } from '@uikit/organisms'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

const FavouritesScreen = () => {
  const { t } = useTranslation()

  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>()

  const { keyboardShown } = useKeyboard()

  const [search, setSearch] = useState<string>('')

  const { favoritesStore } = useStore()

  const onPressCard = (data: CharacterShortData) => {
    navigation.navigate('CharacterInfo', { url: data.url })
  }

  const onSelectFavorite = (data: CharacterShortData) => {
    favoritesStore.updateFavoriteCharacters(data)
  }

  const onPressClearFans = () => {
    favoritesStore.clearAll()
  }

  const characters = favoritesStore.characters.filter(character =>
    searchFilter(search, character),
  )

  return (
    <KeyboardAvoidingView>
      <View style={tw`flex-1 px-4`}>
        {keyboardShown || (
          <FansCounter
            quantity={favoritesStore.genderRecalculation}
            containerStyle={tw`mt-5`}
          />
        )}

        <TextInput
          containerStyle={tw`mt-5 -mb-1`}
          value={search}
          onChangeText={setSearch}
          placeholder={t('ui.placeholder.search')}
        />

        <CharacterList
          data={characters}
          search={search}
          contentContainerStyle={tw`pb-1`}
          onPressCard={onPressCard}
          onSelectFavorite={onSelectFavorite}
        />

        <View
          style={tw`absolute bottom-1 left-0 right-0 items-center`}
          pointerEvents="box-none"
        >
          <CroppedButton
            title={t('ui.list.clear_fans')}
            onPress={onPressClearFans}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default observer(FavouritesScreen)
