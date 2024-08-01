import { Header, type StackHeaderProps } from '@react-navigation/stack'
import tw from '@tools/tailwind'
import { NotchContainer } from '@uikit/atoms'
import { View } from 'react-native'

const NotchedHeader: React.FC<StackHeaderProps> = props => {
  return (
    <View>
      <Header {...props} />
      <NotchContainer style={tw`-mb-[14px] w-full`} />
    </View>
  )
}

export default NotchedHeader
