import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { expect, test } from 'vitest'

import App from '@/App'

test('heading element should in the document', () => {
  // https://testing-library.com/docs/react-testing-library/api#render
  render(<App />)

  // https://testing-library.com/docs/queries/byrole
  const headingElement = screen.getByRole('heading')

  // expect(result).matcher
  expect(headingElement).toBeInTheDocument()
})

// test('button element should in the document', () => {
//   render(<App />)

//   const buttonElement = screen.getByRole('button')

//   expect(buttonElement).toBeInTheDocument()
// })
