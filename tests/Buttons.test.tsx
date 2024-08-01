import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'
import { OutlinedButton } from '@uikit/atoms/buttons'

describe('Text buttons component', () => {
  describe('---[OutlinedButton]---', () => {
    const buttonTitle = 'Press me'.toLocaleUpperCase()

    test('renders button with correct title', () => {
      const { getByText } = render(<OutlinedButton title={buttonTitle} />)
      const buttonElement = getByText(buttonTitle)

      expect(buttonElement).toBeTruthy()
    })

    test('calls onPress when the button is pressed', () => {
      const onPressMock = jest.fn()
      const { getByText } = render(
        <OutlinedButton title={buttonTitle} onPress={onPressMock} />,
      )
      const buttonElement = getByText(buttonTitle)

      fireEvent.press(buttonElement)

      expect(onPressMock).toHaveBeenCalled()
    })
  })
})
