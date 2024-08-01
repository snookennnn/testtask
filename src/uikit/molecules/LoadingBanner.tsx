import tw from '@tools/tailwind'
import { Animation } from '@uikit/atoms'
import { View } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const LoadingBanner = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Animation
        name="Loading"
        style={tw.style({ height: hp(80), width: wp(80) })}
      />
    </View>
  )
}

export default LoadingBanner
