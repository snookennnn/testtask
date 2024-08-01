import {
  TransitionPresets,
  createStackNavigator,
  type StackScreenProps,
} from '@react-navigation/stack'
import tw from '@tools/tailwind'
import { Animation } from '@uikit/atoms'
import { NotchedHeader } from '@uikit/molecules/navigation'
import { TouchableOpacity } from 'react-native'
import CharacterInfoScreen from './CharacterInfo'
import HomeTabScreen from './home'

export type RootStackParamList = {
  Home: undefined
  CharacterInfo: { url: string }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

const Stack = createStackNavigator<RootStackParamList>()

const RootRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: tw`bg-primary-dark`,
        headerTitleStyle: tw`font-bold text-white`,
        headerLeft: ({ canGoBack, onPress }) => {
          if (!canGoBack) return null

          return (
            <TouchableOpacity style={tw`rounded-full`} onPress={onPress}>
              <Animation
                name="ArrowBack"
                style={tw.style({ height: 80, width: 80 })}
                colorFilters={[
                  { color: tw.color('bg-white')!, keypath: 'scroll_up' },
                ]}
              />
            </TouchableOpacity>
          )
        },
        cardStyle: tw`bg-black`,
        ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Stack.Screen name="Home" component={HomeTabScreen} />

      <Stack.Screen
        name="CharacterInfo"
        component={CharacterInfoScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          header: NotchedHeader,
        }}
      />
    </Stack.Navigator>
  )
}

export default RootRouter
