import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import CircleProperty from '@/components/CircleProperty'

function CirclePropertyMock() {
  const [property, setProperty] = useState<number>(0)

  return <CircleProperty {...{ property, setProperty }}>Demo</CircleProperty>
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

  it('should render the label element correctly', async () => {
    const labelElement = screen.getByText(/demo/i)

    expect(labelElement).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it('', async () => {})
})
