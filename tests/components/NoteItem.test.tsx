import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@/index.css'
import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import type { Note } from '@/types/Note'

import NoteItem from '@/components/NoteItem'
import { deleteNoteById } from '@/services/apiNote'

vi.mock('@/services/apiNote', { spy: true })

const mockNote: Note = {
  id: '1043',
  title: 'dummy title',
  content: 'dummy content',
}

function NoteItemMock() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NoteItem note={mockNote} />
      <Toaster />
    </QueryClientProvider>
  )
}

// beforeEach(async () => {
//   await render(<NoteItemMock />)
// })

describe('static render test', async () => {
  it('should render the correct buttons with accessibile names', async () => {
    // Arrange
    await render(<NoteItemMock />)

    // Act

    // Assert
    const editButton = page.getByRole('button', { name: 'edit-button' })
    const deleteButton = page.getByRole('button', { name: 'delete-button' })

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it('should render the toaster after user click the delete button and success delete', async () => {
    // Arrange
    const user = userEvent.setup()

    vi.mocked(deleteNoteById).mockResolvedValue(mockNote)

    await render(<NoteItemMock />)

    // Act
    const deleteButtonLocator = page.getByRole('button', { name: 'delete-button' })
    await user.click(deleteButtonLocator)

    // Assert
    const toastLocator = page.getByText(/Note deleted successfully/i)
    await expect.element(toastLocator).toBeInTheDocument()
  })
})
