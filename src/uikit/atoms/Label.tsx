import tw from '@tools/tailwind'
import { Text, View } from 'react-native'

export interface LabelProps {
  title: string
  description: string
}

const Label = ({ description = '', title = '' }: LabelProps) => {
  return (
    <View style={tw`flex-1`}>
      <Text style={tw`my-2 font-bold text-base text-white`}>{title}</Text>
      <Text style={tw`mb-2 font-medium text-sm text-white`}>{description}</Text>
    </View>
  )
}

export default Label
