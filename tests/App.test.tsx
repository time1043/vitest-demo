import { render, screen } from '@testing-library/react'

import App from '@/App'

import { user } from './setup'

beforeEach(() => {
  render(<App />)
})

describe('user interactions', async () => {
  const circle = () => document.querySelector('.circle') as HTMLElement

  it('toggles purple class on and off', async () => {
    const checkboxElement = screen.getByRole('checkbox')
    expect(circle()).not.toHaveClass('purple')

    await user.click(checkboxElement)
    expect(circle()).toHaveClass('purple')

    await user.click(checkboxElement)
    expect(circle()).not.toHaveClass('purple')
  })

  it('applies size / rotate to inline style', async () => {
    const [inputSizeElement, inputRotateELement] = screen.getAllByRole('spinbutton')

    // await user.type(inputSizeElement, '{selectall}200')
    await user.clear(inputSizeElement)
    await user.type(inputSizeElement, '200')
    expect(circle()).toHaveStyle({ width: '200px', height: '200px', lineHeight: '200px' })

    // await user.type(inputRotateELement, '{selectall}45')
    await user.clear(inputRotateELement)
    await user.type(inputRotateELement, '45')
    expect(circle()).toHaveStyle({ transform: 'rotate(45deg)' })
  })

  it('applies text color class and composes with purple', async () => {
    const selectElement = screen.getByRole('combobox')

    await user.selectOptions(selectElement, 'text-orange')
    await user.click(screen.getByRole('checkbox'))
    expect(circle()).toHaveClass('text-orange', 'purple')
  })
})
