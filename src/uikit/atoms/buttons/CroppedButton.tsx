import tw from '@tools/tailwind'
import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from 'react-native'

export interface CroppedButtonProps
  extends Pick<TouchableOpacityProps, 'onPress' | 'disabled' | 'style'> {
  title: string
}

const CroppedButton = ({
  title = '',
  disabled = false,
  onPress,
  style,
}: CroppedButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={tw.style('py-3 px-12 justify-center', style as object)}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={tw`absolute bottom-0 right-0 left-0 h-0 border-b-[50px] border-r-[25px] border-r-transparent border-l-[25px] border-l-transparent border-b-primary-dark`}
      />

      <Text
        style={tw.style(`font-bold text-white text-base text-center`, {
          'opacity-10': !!disabled,
        })}
        numberOfLines={1}
      >
        {title.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}

export default CroppedButton
