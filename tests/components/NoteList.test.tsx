import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@/index.css'
import { http, HttpResponse } from 'msw/http'
import { delay } from 'msw/utils/delay'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'

import NoteList from '@/components/NoteList'

import { worker } from '../mocks/server'

const API_URL = import.meta.env.VITE_API_URL

function NoteListMock() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <NoteList />
    </QueryClientProvider>
  )
}

// beforeEach(async () => {
//   await render(<NoteListMock />)
// })

describe('static render test', async () => {
  it('should render list items with correct count (isSuccess)', async () => {
    // Arrange
    await render(<NoteListMock />)

    await vi.waitFor(async () => {
      const mainLocator = page.getByRole('main')
      expect(mainLocator).toBeInTheDocument()
    })

    // Act

    // Assert
    const noteItemsElement = page.getByRole('listitem').elements()
    expect(noteItemsElement.length).toBeGreaterThan(0)
  })

  it('should render the skeleton while the data is fetching (isLoading)', async () => {
    // Arrange
    worker.use(
      http.get(`${API_URL}`, async () => {
        await delay()
        return HttpResponse.json([])
      }),
    )

    await render(<NoteListMock />)

    // Act

    // Assert
    const progressBarLocator = page.getByRole('progressbar')
    expect(progressBarLocator).toBeInTheDocument()
  })

  it('should display the error message while the api function throws an error (isError)', async () => {
    // Arrange
    worker.use(
      http.get(`${API_URL}`, () => {
        return HttpResponse.error()
      }),
    )

    await render(<NoteListMock />)

    // Act

    // Assert
    const errorAlertLocator = page.getByRole('alert')
    await expect.element(errorAlertLocator).toBeInTheDocument()
  })
})

describe.skip('user interactions', async () => {
  it('should', async () => {
    // Arrange
    // Act
    // Assert
  })
})
