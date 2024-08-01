import { useIsFocused } from '@react-navigation/native'
import tw from '@tools/tailwind'
import { useLayoutEffect } from 'react'
import { Platform, StatusBar, type ColorValue } from 'react-native'

export interface ChangeStatusBarColorConfig {
  currentColor: ColorValue
  previousColor?: ColorValue
  animated?: boolean
}

/**
 * Hook to access changing the background color of the Status Bar on the current screen.
 *
 * @platform Android only
 */
const useChangeStatusBarColor = ({
  currentColor,
  previousColor,
  animated,
}: ChangeStatusBarColorConfig) => {
  if (Platform.OS !== 'android') return

  const focused = useIsFocused()

  useLayoutEffect(() => {
    const color = focused
      ? currentColor
      : previousColor || tw.color('bg-black')!

    StatusBar.setBackgroundColor(color, animated)
  }, [focused])
}

export default useChangeStatusBarColor
