import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import TogglePurple from '@/components/TogglePurple'

const isPurple = false
function setIsPurple(isPurple: boolean) {}

render(<TogglePurple {...{ isPurple, setIsPurple }} />)

test('TogglePurple checkboxElement', () => {
  const checkboxElement = screen.getByRole('checkbox')

  expect(checkboxElement).toBeInTheDocument()
})

test('TogglePurple labelElement', () => {
  const labelElement = screen.getByText(/purple/i)

  expect(labelElement).toBeInTheDocument()
})
