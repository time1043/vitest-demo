import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import App from '@/App'
import '@/index.css'

beforeEach(async () => {
  await render(<App />)
})

describe('static render test', () => {
  it('should render the two number inputs with their default values', async () => {
    // Arrange / Act
    const [sizeInputLocator, rotateInputLocator] = page.getByRole('spinbutton').all()

    // Assert
    await expect.element(sizeInputLocator).toHaveValue(150)
    await expect.element(rotateInputLocator).toHaveValue(0)
  })

  it('should render the circle with the default style and text', async () => {
    // Arrange / Act
    const circleLocator = page.getByText('Hi!')

    // Assert
    await expect.element(circleLocator).toHaveStyle({
      height: '150px',
      width: '150px',
      lineHeight: '150px',
    })
    await expect.element(circleLocator).not.toHaveClass('purple')
  })
})

describe('user interactions', () => {
  it('should resize the circle after user changes the circle size', async () => {
    // Arrange
    const user = userEvent.setup()
    const [sizeInputLocator] = page.getByRole('spinbutton').all()

    // Act
    await user.fill(sizeInputLocator, '200')

    // Assert
    await expect.element(sizeInputLocator).toHaveValue(200)
    await expect.element(page.getByText('Hi!')).toHaveStyle({
      height: '200px',
      width: '200px',
      lineHeight: '200px',
    })
  })

  it('should rotate the circle after user changes the circle rotate', async () => {
    // Arrange
    const user = userEvent.setup()
    const [, rotateInputLocator] = page.getByRole('spinbutton').all()

    // Act
    await user.fill(rotateInputLocator, '45')

    // Assert
    await expect.element(rotateInputLocator).toHaveValue(45)
    await expect.element(page.getByText('Hi!')).toHaveStyle({ transform: 'rotate(45deg)' })
  })

  it('should turn the circle purple after user clicks the checkbox', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    await user.click(page.getByRole('checkbox'))

    // Assert
    await expect.element(page.getByRole('checkbox')).toBeChecked()
    await expect.element(page.getByText('Hi!')).toHaveClass('purple')
  })

  it('should apply the selected text color class to the circle', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    await user.selectOptions(page.getByRole('combobox'), 'text-orange')

    // Assert
    await expect.element(page.getByRole('combobox')).toHaveValue('text-orange')
    await expect.element(page.getByText('Hi!')).toHaveClass('text-orange')
  })
})
