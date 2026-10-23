import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'

import type { Note } from '@/types/Note'

import NoteList from '@/components/NoteList'
import { getNotes } from '@/services/apiNote'

// import { getNotes } from '@/services/apiNote'
vi.mock('@/services/apiNote')

function NoteListMock() {
  const queryClient = new QueryClient()

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
  it('should render list items with correct count', async () => {
    // Arrange
    const mockNotes: Note[] = [
      { id: '1', title: 'title 1', content: 'content 1' },
      { id: '2', title: 'title 2', content: 'content 2' },
    ]

    vi.mocked(getNotes).mockResolvedValue(mockNotes)

    await render(<NoteListMock />)

    await vi.waitFor(async () => {
      const mainLocator = page.getByRole('main')
      expect(mainLocator).toBeInTheDocument()
    })

    // Act

    // Assert
    const noteItemsElement = page.getByRole('listitem').elements()
    expect(noteItemsElement).toHaveLength(mockNotes.length)
  })
})

describe.skip('user interactions', async () => {
  it('should', async () => {
    // Arrange
    // Act
    // Assert
  })
})
