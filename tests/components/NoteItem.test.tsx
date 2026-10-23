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
  it('should render the correct buttons with accessibile names', async () => {
    // Arrange
    // Act

    // Assert
    const editButton = page.getByRole('button', { name: 'edit-button' })
    const deleteButton = page.getByRole('button', { name: 'delete-button' })

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })
})

describe.skip('user interactions', async () => {
  it('should', async () => {
    // Arrange
    // Act
    // Assert
  })
})
