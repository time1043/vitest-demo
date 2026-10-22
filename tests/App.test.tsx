import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '@/App'

function AppMock() {
  return <App />
}

beforeEach(() => {
  render(<AppMock />)
})

describe('user interactions', async () => {
  it('should display correct color after user click', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    const buttonElement = screen.getByRole('button')
    await user.click(buttonElement)

    // Assert
    expect(buttonElement).toHaveTextContent('Active')
    expect(buttonElement).toHaveClass('active')
    expect(buttonElement).toHaveStyle({ backgroundColor: 'hex(#f5222d)' }) // ⚠️

    const backgroundColor = window.getComputedStyle(buttonElement).backgroundColor
    expect(backgroundColor).toBe('rgba(245, 34, 45)') // rgba(0, 0, 0, 0)
  })
})
