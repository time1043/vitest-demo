import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import TogglePurple from '@/components/TogglePurple'

import { user } from '../setup'

function TogglePurpleMock() {
  const [isPurple, setIsPurple] = useState<boolean>(false)

  return <TogglePurple {...{ isPurple, setIsPurple }} />
}

// https://vitest.dev/config/globals#globals
// https://testing-library.com/docs/react-testing-library/api#cleanup
// https://vitest.dev/api/hooks#aftereach
// https://vitest.dev/api/hooks#beforeeach
beforeEach(() => {
  render(<TogglePurpleMock />)
})

describe('static render test', () => {
  it('should render the checkbox and the checkbox should not be checked', () => {
    // Arrange / Act
    const checkboxElement = screen.getByRole('checkbox')

    // Assert
    // https://github.com/testing-library/jest-dom#custom-matchers
    // https://vitest.dev/api/expect#not
    expect(checkboxElement).toBeInTheDocument()
    expect(checkboxElement).not.toBeChecked()

    // Automatically call cleanup to unmount the component which rendered before
  })

  it('should render the label with purple text', () => {
    // Arrange / Act
    const labelElement = screen.getByText(/purple/i)
    // screen.debug()

    // Assert
    expect(labelElement).toBeInTheDocument()
  })
})

// https://testing-library.com/docs/user-event/intro
describe('user interactions', async () => {
  it('should be checked after user click', async () => {
    // Arrange
    const checkboxElement = screen.getByRole('checkbox')

    // Act
    await user.click(checkboxElement)

    // Assert
    expect(checkboxElement).toBeChecked()
  })
})
