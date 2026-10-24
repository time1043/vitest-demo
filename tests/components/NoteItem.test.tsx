import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import type { Note } from '@/types/Note'

import NoteItem from '@/components/NoteItem'

import { notes } from '../mocks/collections/note'
import Provider from '../provider'

const mockNote: Note = {
  id: '1043',
  title: 'dummy title',
  content: 'dummy content',
}

async function renderComponent() {
  return render(
    <>
      <NoteItem note={mockNote} />
      <Toaster />
    </>,
    { wrapper: Provider },
  )
}

describe('static render test', async () => {
  it('should render the correct buttons with accessibile names', async () => {
    // Arrange
    await renderComponent()

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

    await renderComponent()
    await notes.create(mockNote)

    // Act
    const deleteButtonLocator = page.getByRole('button', { name: 'delete-button' })
    await user.click(deleteButtonLocator)

    // Assert
    const toastLocator = page.getByText(/Note deleted successfully/i)
    await expect.element(toastLocator).toBeInTheDocument()
  })
})
