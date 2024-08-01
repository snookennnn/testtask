import tw from '@tools/tailwind'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

export interface OutlinedButtonProps
  extends Pick<TouchableOpacityProps, 'onPress' | 'disabled' | 'style'> {
  title: string
  loading?: boolean
}

const OutlinedButton = ({
  title = '',
  disabled = false,
  loading = false,
  onPress,
  style,
}: OutlinedButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={tw.style(
        'py-2 px-8 justify-center bg-black rounded-full border-2 border-golden overflow-hidden',
        style as object,
        {
          'opacity-30': !!disabled,
        },
      )}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={tw`font-bold text-white text-base text-center`}>
        {title.toLocaleUpperCase()}
      </Text>

      {loading && (
        <ActivityIndicator
          style={tw`absolute self-center`}
          color={tw.color('bg-golden')}
          size={'large'}
        />
      )}
    </TouchableOpacity>
  )
}

export default OutlinedButton
