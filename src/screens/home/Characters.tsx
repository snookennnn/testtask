import { useCharactersQuery } from '@api'
import type { CharacterShortData } from '@models/characters'
import { useNavigation } from '@react-navigation/native'
import type { RootStackScreenProps } from '@screens'
import { searchFilter } from '@screens/tools'
import useStore from '@stores'
import tw from '@tools/tailwind'
import { KeyboardAvoidingView, TextInput } from '@uikit/atoms'
import { OutlinedButton } from '@uikit/atoms/buttons'
import { LoadingBanner } from '@uikit/molecules'
import { CharacterList } from '@uikit/organisms'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

const CharactersScreen = () => {
  const { t } = useTranslation()

  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>()

  const [search, setSearch] = useState<string>('')

  const charactersQuery = useCharactersQuery()
  const { favoritesStore } = useStore()

  const onPressCard = (data: CharacterShortData) => {
    navigation.navigate('CharacterInfo', { url: data.url })
  }

  const onSelectFavorite = (data: CharacterShortData) => {
    favoritesStore.updateFavoriteCharacters(data)
  }

  if (!charactersQuery.isFetched) {
    return <LoadingBanner />
  }

  const characters: CharacterShortData[] = charactersQuery.data.characters
    .filter(character => searchFilter(search, character))
    .map(character => ({
      ...character,
      favorite: favoritesStore.characters.some(
        favorite => favorite.url === character.url,
      ),
    }))

  const disabledLoadMore =
    charactersQuery.isFetching || charactersQuery.isFetchingNextPage

  return (
    <KeyboardAvoidingView>
      <View style={tw`flex-1 px-4`}>
        <TextInput
          containerStyle={tw`mt-5 -mb-1`}
          value={search}
          onChangeText={setSearch}
          placeholder={t('ui.placeholder.search')}
        />

        <CharacterList
          data={characters}
          search={search}
          onPressCard={onPressCard}
          onSelectFavorite={onSelectFavorite}
          ListFooterComponent={
            !characters.length ? null : (
              <View style={tw`pb-5 justify-center items-center`}>
                {charactersQuery.data.hasNextPage ? (
                  <OutlinedButton
                    disabled={disabledLoadMore}
                    loading={disabledLoadMore}
                    title={t('ui.list.load_more')}
                    onPress={() => charactersQuery.fetchNextPage()}
                  />
                ) : (
                  <Text
                    style={tw`font-bold text-primary-dark text-base text-center`}
                  >
                    {t('ui.list.loaded')}
                  </Text>
                )}
              </View>
            )
          }
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default observer(CharactersScreen)
