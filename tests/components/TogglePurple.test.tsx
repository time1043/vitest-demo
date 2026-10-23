import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import TogglePurple from '@/components/TogglePurple'

function TogglePurpleMock() {
  const [isPurple, setIsPurple] = useState<boolean>(false)

  return <TogglePurple {...{ isPurple, setIsPurple }} />
}

// https://vitest.dev/config/globals#globals
// https://testing-library.com/docs/react-testing-library/api#cleanup
// https://vitest.dev/api/hooks#aftereach
// https://vitest.dev/api/hooks#beforeeach
beforeEach(async () => {
  await render(<TogglePurpleMock />)
})

describe('static render test', () => {
  it('should render the checkbox and the checkbox should not be checked', async () => {
    // Arrange / Act
    const checkboxElement = page.getByRole('checkbox')

    // Assert
    // https://github.com/testing-library/jest-dom#custom-matchers
    // https://vitest.dev/api/expect#not
    await expect.element(checkboxElement).toBeInTheDocument()
    await expect.element(checkboxElement).not.toBeChecked()

    // Automatically call cleanup to unmount the component which rendered before
  })

  it('should render the label with purple text', async () => {
    // Arrange / Act
    const labelElement = page.getByText(/purple/i)
    // screen.debug()

    // Assert
    await expect.element(labelElement).toBeInTheDocument()
  })
})

// https://testing-library.com/docs/user-event/intro
describe('user interactions', async () => {
  it('should be checked after user click', async () => {
    // Arrange
    const user = userEvent.setup()
    const checkboxElement = page.getByRole('checkbox')

    // Act
    await user.click(checkboxElement)

    // Assert
    await expect.element(checkboxElement).toBeChecked()
  })
})
