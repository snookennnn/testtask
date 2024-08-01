import { CharactersIcon, HeartIcon, LogoIcon } from '@assets/icons'
import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { RootStackParamList } from '@screens'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CharactersScreen from './Characters'
import FavouritesScreen from './Favourites'

export type HomeTabParamList = {
  Characters: undefined
  Favourites: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    StackScreenProps<RootStackParamList>
  >

const Tab = createBottomTabNavigator<HomeTabParamList>()

const HomeTabScreen = () => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Characters"
      sceneContainerStyle={tw`bg-black`}
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: tw.style('bg-transparent', {
          height: wp(20) + insets.top,
        }),
        headerTitle: () => (
          <LogoIcon width={wp(30)} fill={tw.color('bg-white')} />
        ),
        tabBarStyle: tw`-mt-1 mx-4 mb-4 h-23 bg-primary-dark rounded-lg border-t-0`,
        tabBarAllowFontScaling: false,
        tabBarItemStyle: tw`mx-3 h-18`,
        tabBarLabelStyle: tw`font-bold text-sm`,
        tabBarActiveTintColor: tw.color('bg-golden'),
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          title: t('ui.navigation.characters'),
          tabBarIcon: ({ color, size }) => (
            <CharactersIcon
              width={size * 1.5}
              height={size * 1.5}
              fill={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: t('ui.navigation.favourites'),
          tabBarIcon: ({ color, size }) => (
            <HeartIcon width={size} height={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeTabScreen
