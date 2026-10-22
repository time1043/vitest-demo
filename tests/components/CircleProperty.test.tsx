import { cleanup, render, screen } from '@testing-library/react'
import { useState, type PropsWithChildren } from 'react'

import CircleProperty from '@/components/CircleProperty'

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
  it('', async () => {})
})
