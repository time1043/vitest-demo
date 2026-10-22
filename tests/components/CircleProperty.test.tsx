import { cleanup, render, screen } from '@testing-library/react'
import { useState, type PropsWithChildren } from 'react'

import CircleProperty from '@/components/CircleProperty'

import { user } from '../setup'

function CirclePropertyMock({ children = 'Demo' }: PropsWithChildren) {
  const [property, setProperty] = useState<number>(0)

  return <CircleProperty {...{ property, setProperty }}>{children}</CircleProperty>
}

beforeEach(() => {
  render(<CirclePropertyMock />)
})

describe('static render test', async () => {
  it('should render the input element correctly', async () => {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#technical_summary
    const inputNumberElement = screen.getByRole('spinbutton')

    expect(inputNumberElement).toBeInTheDocument()
  })

  it('should render the label element with correct text', async () => {
    cleanup()

    const labelText = 'Hhh'
    render(<CirclePropertyMock>{labelText}</CirclePropertyMock>)
    // screen.debug() // render twice if do not cleanup manually

    const labelElement = screen.getByText(labelText)

    expect(labelElement).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it('should display the correct number in the input after user type', async () => {
    const inputNumber = 1043

    const inputNumberElement = screen.getByRole('spinbutton')

    // https://testing-library.com/docs/user-event/keyboard
    await user.click(inputNumberElement)
    await user.keyboard(inputNumber.toString())

    // // https://testing-library.com/docs/user-event/utility#type
    // await user.type(inputNumberElement, number.toString())

    expect(inputNumberElement).toHaveValue(inputNumber)
  })
})
