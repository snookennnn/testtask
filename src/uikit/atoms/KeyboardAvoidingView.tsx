import tw from '@tools/tailwind'
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets()

  const keyboardVerticalOffset =
    hp(Platform.OS === 'ios' ? 13 : 15) + insets.bottom / 2

  return (
    <RNKeyboardAvoidingView
      style={tw`flex-1`}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...props}
    >
      {children}
    </RNKeyboardAvoidingView>
  )
}

export default KeyboardAvoidingView
