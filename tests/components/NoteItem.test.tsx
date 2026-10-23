import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'

import type { Note } from '@/types/Note'

import NoteItem from '@/components/NoteItem'

function NoteItemMock() {
  const queryClient = new QueryClient()

  const note: Note = {
    id: '1043',
    title: 'dummy title',
    content: 'dummy content',
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NoteItem note={note} />
    </QueryClientProvider>
  )
}

beforeEach(async () => {
  await render(<NoteItemMock />)
})

describe('static render test', async () => {
  it('should render two buttons correctly', async () => {
    // Arrange
    // Act

    // Assert
    const editButtonLocator = page.getByRole('edit-button')
    const deleteButtonLocator = page.getByRole('delete-button')
    await expect.element(editButtonLocator).toBeInTheDocument()
    await expect.element(deleteButtonLocator).toBeInTheDocument()
  })
})

describe.skip('user interactions', async () => {
  it('should', async () => {
    // Arrange
    // Act
    // Assert
  })
})
