import type { GenderRecalculation } from '@models/stores'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'
import { Text, View, type ViewStyle } from 'react-native'

export interface FansCounterProps {
  quantity: GenderRecalculation
  containerStyle?: ViewStyle
}

export interface CounterContainerProps {
  title: string
  count: number
  rightGap?: boolean
}

export const CounterContainer = ({
  title,
  count,
  rightGap = false,
}: CounterContainerProps) => (
  <View
    style={tw.style(`flex-1 rounded-lg overflow-hidden`, {
      'mr-2': rightGap,
    })}
  >
    <View
      style={tw`w-1/2 h-0 border-b-[8px] border-r-[8px] border-r-transparent border-b-primary-dark`}
    />

    <View style={tw`py-2 px-3 bg-primary-dark rounded-tr-lg`}>
      <Text
        ellipsizeMode="middle"
        numberOfLines={1}
        style={tw`font-bold text-2xl text-white`}
      >
        {count}
      </Text>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={tw`font-medium text-sm text-center text-white`}
      >
        {title}
      </Text>
    </View>
  </View>
)

const FansCounter = ({ quantity, containerStyle }: FansCounterProps) => {
  const { t } = useTranslation()

  return (
    <View style={tw.style(`mb-4 flex-row w-full`, containerStyle)}>
      <CounterContainer
        title={t('ui.gender_fans.female')}
        count={quantity.female}
        rightGap
      />
      <CounterContainer
        title={t('ui.gender_fans.male')}
        count={quantity.male}
        rightGap
      />
      <CounterContainer
        title={t('ui.gender_fans.others')}
        count={quantity.others}
      />
    </View>
  )
}

export default FansCounter
