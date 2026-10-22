import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'

import App from '@/App'

describe('user interactions', async () => {
  it('should display correct color after user click', async () => {
    // Arrange
    const { getByRole } = await render(<App />)

    // Act
    // https://vitest.dev/api/browser/interactivity
    // https://vitest.dev/api/browser/locators
    const buttonLocator = getByRole('button')
    await userEvent.click(buttonLocator)

    // Assert
    await expect.element(buttonLocator).toBeInTheDocument()
    expect(buttonLocator).toHaveClass('active')

    const backgroundColor = window.getComputedStyle(buttonLocator.element()).backgroundColor
    expect(backgroundColor).toBe('rgb(245, 34, 45)')
  })
})
