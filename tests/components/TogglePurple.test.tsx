import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'

import TogglePurple from '@/components/TogglePurple'

const isPurple = false
function setIsPurple(isPurple: boolean) {}

render(<TogglePurple {...{ isPurple, setIsPurple }} />)

// deinsoftware.vitest-snippets - `iv`, `ive`
it('should render the checkbox and the checkbox should not be checked', () => {
  const checkboxElement = screen.getByRole('checkbox')

  // https://github.com/testing-library/jest-dom#custom-matchers
  // https://vitest.dev/api/expect#not
  expect(checkboxElement).toBeInTheDocument()
  expect(checkboxElement).not.toBeChecked()
})

it('should render the label with purple text', () => {
  const labelElement = screen.getByText(/purple/i)

  expect(labelElement).toBeInTheDocument()
})
