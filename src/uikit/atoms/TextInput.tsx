import tw from '@tools/tailwind'
import {
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native'

export interface TextInputProps extends RNTextInputProps {
  containerStyle?: ViewStyle
}

const TextInput = ({ style, containerStyle, ...props }: TextInputProps) => {
  return (
    <View
      style={tw.style(
        'px-2 h-12 bg-primary-dark rounded-lg overflow-hidden',
        containerStyle,
      )}
    >
      <RNTextInput
        multiline={false}
        autoCorrect={false}
        maxLength={120}
        numberOfLines={1}
        placeholderTextColor={tw.color('bg-warmGray-500')}
        cursorColor={tw.color('bg-golden')}
        selectionColor={tw.color('bg-golden')}
        underlineColorAndroid={tw.color('bg-transparent')}
        keyboardAppearance="dark"
        {...props}
        style={tw.style(
          `p-0 h-10 font-bold text-white text-base border-b-2 border-b-black`,
          style as object,
        )}
      />
    </View>
  )
}

export default TextInput
