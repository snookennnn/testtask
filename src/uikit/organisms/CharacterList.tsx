import type { CharacterShortData } from '@models/characters'
import { FlashList, type FlashListProps } from '@shopify/flash-list'
import tw from '@tools/tailwind'
import { CharacterCard } from '@uikit/molecules/rows'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

export interface CharacterListProps
  extends Partial<FlashListProps<CharacterShortData>> {
  search?: string
  onPressCard?: (data: CharacterShortData) => void
  onSelectFavorite?: (data: CharacterShortData) => void
}

const CharacterList = ({
  data = [],
  search = '',
  onPressCard,
  onSelectFavorite,
  contentContainerStyle,
  ...props
}: CharacterListProps) => {
  const { t } = useTranslation()

  const getSearchTitle = (search: string) => [
    t('ui.list.search.title'),
    <Text key={'search-text'} style={tw`text-golden`}>
      {search}
    </Text>,
    <Text key={'description-text'} style={tw`text-sm`}>
      {t('ui.list.search.description')}
    </Text>,
  ]

  return (
    <FlashList
      indicatorStyle="white"
      estimatedItemSize={200}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw.style(`pt-5`, contentContainerStyle)}
      nestedScrollEnabled
      ListEmptyComponent={
        <Text style={tw`my-4 font-bold text-white text-base text-center`}>
          {search.length ? getSearchTitle(search) : t('ui.list.empty')}
        </Text>
      }
      {...props}
      data={data}
      keyExtractor={(_, index) => `character-${index}`}
      renderItem={({ item }) => (
        <CharacterCard
          data={item}
          onPress={() => onPressCard?.(item)}
          onSelectFavorite={onSelectFavorite}
        />
      )}
    />
  )
}

export default CharacterList
