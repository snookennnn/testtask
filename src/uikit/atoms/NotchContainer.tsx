import tw from '@tools/tailwind'
import { View, type ViewProps } from 'react-native'

export interface NotchContainerPros extends ViewProps {}

const NotchContainer = ({ style, ...props }: NotchContainerPros) => (
  <View
    {...props}
    style={tw.style(style as object, `flex-row justify-between`)}
  >
    <View
      style={tw`w-1/2 h-0 border-t-[14px] border-r-[14px] border-r-transparent border-t-primary-dark`}
    />
    <View
      style={tw`w-1/4 h-0 border-t-[14px] border-l-[14px] border-l-transparent border-t-primary-dark`}
    />
  </View>
)

export default NotchContainer
