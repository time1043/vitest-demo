import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import TogglePurple from '@/components/TogglePurple'

test('TogglePurple checkboxElement', () => {
  const isPurple = false
  function setIsPurple(isPurple: boolean) {}

  // https://testing-library.com/docs/react-testing-library/api#render
  render(<TogglePurple {...{ isPurple, setIsPurple }} />)

  // https://testing-library.com/docs/queries/about#types-of-queries
  // https://testing-library.com/docs/queries/byrole
  const checkboxElement = screen.getByRole('checkbox')

  // expect(result).matcher
  // https://testing-library.com/docs/ecosystem-jest-dom
  // https://github.com/testing-library/jest-dom#usage
  expect(checkboxElement).toBeInTheDocument()
})
