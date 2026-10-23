import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'

import NoteList from '@/components/NoteList'
import '@/index.css'
import { getNotes } from '@/services/apiNote'

// import { getNotes } from '@/services/apiNote'
vi.mock('@/services/apiNote', { spy: true })

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

  it.skip('should render the skeleton while the data is fetching (isLoading)', async () => {
    // Arrange
    // vi.mocked(getNotes).mockResolvedValue(undefined)
    vi.mocked(getNotes).mockImplementation(() => {
      // neither resolved nor rejected, always pending
      return new Promise(() => {})
    })

    await render(<NoteListMock />)

    // Act

    // Assert
    const progressBarLocator = page.getByRole('progressbar')
    expect(progressBarLocator).toBeInTheDocument()
  })

  it.skip('should display the error message while the api function throws an error (isError)', async () => {
    // Arrange
    const errorMessage = 'error from vitest'
    vi.mocked(getNotes).mockRejectedValue(new Error(errorMessage))

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
