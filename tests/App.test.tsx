import { act } from 'react'
import ReactDOMClient, { type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it } from 'vitest'

import App from '@/App'

// Let React know that this is a test environment, so `act` can flush updates.
// https://react.dev/reference/react/act#rendering-components-in-tests
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root | undefined

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(async () => {
  await act(() => root?.unmount())

  container.remove()
  root = undefined
})

it('can render and update a counter', async () => {
  // ✅ Render the component inside act().
  await act(() => {
    root = ReactDOMClient.createRoot(container)
    root.render(<App />)
  })

  const button = container.querySelector('button')
  const label = container.querySelector('p')
  expect(label?.textContent).toBe('0 x 2 = 0')

  // ✅ Update the component inside act().
  await act(() => button?.click())
  expect(label?.textContent).toBe('1 x 2 = 2')

  await act(() => button?.click())
  expect(label?.textContent).toBe('2 x 2 = 4')
})
