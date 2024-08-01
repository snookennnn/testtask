import LottieView, { type LottieViewProps } from 'lottie-react-native'
import { forwardRef } from 'react'
import * as Animations from './assets'

export interface AnimationProps extends Omit<LottieViewProps, 'source'> {
  name: keyof typeof Animations
}

const Animation = forwardRef<LottieView, AnimationProps>(
  ({ name, autoPlay = true, loop = true, ...props }, ref) => {
    const animationSource = Animations[name]

    return (
      <LottieView
        ref={ref}
        {...props}
        {...{ autoPlay, loop }}
        source={animationSource}
      />
    )
  },
)

export default Animation
