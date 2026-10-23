import { useState, type PropsWithChildren } from 'react'
import { cleanup, render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import CircleProperty from '@/components/CircleProperty'

function CirclePropertyMock({ children = 'Demo' }: PropsWithChildren) {
  const [property, setProperty] = useState<number>(0)

  return <CircleProperty {...{ property, setProperty }}>{children}</CircleProperty>
}

beforeEach(async () => {
  await render(<CirclePropertyMock />)
})

describe('static render test', async () => {
  it('should render the input element correctly', async () => {
    // Arrange / Act
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#technical_summary
    const inputNumberLocator = page.getByRole('spinbutton')

    // Assert
    expect(inputNumberLocator).toBeInTheDocument()
  })

  it('should render the label element with correct text', async () => {
    // Arrange
    await cleanup()

    const labelText = 'Hhh'
    await render(<CirclePropertyMock>{labelText}</CirclePropertyMock>)
    // screen.debug() // render twice if do not cleanup manually

    // Act
    const labelLocator = page.getByText(labelText)

    // Assert
    expect(labelLocator).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it('should display the correct number in the input after user type', async () => {
    // Arrange
    const user = userEvent.setup()

    const inputNumber = 1043
    const inputNumberLocator = page.getByRole('spinbutton')

    // Act
    // https://testing-library.com/docs/user-event/keyboard
    await user.clear(inputNumberLocator)
    await user.click(inputNumberLocator)
    await user.keyboard(inputNumber.toString())

    // // https://testing-library.com/docs/user-event/utility#type
    // await user.type(inputNumberLocator, inputNumber.toString())

    // Assert
    expect(inputNumberLocator).toHaveValue(inputNumber)
  })
})
