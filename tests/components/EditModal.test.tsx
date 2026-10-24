import { useAtomValue } from 'jotai'
import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { page } from 'vitest/browser'

import type { Note } from '@/types/Note'

import EditModal from '@/components/EditModal'
import { openModal } from '@/hooks/useModel'

import Provider from '../provider'

// vi.mock('jotai', () => ({
//   useAtomValue: () => ({
//     id: '1043',
//     title: 'dummy title',
//     content: 'dummy content',
//   }),
// }))
vi.mock('jotai', async () => {
  const originalModule = await vi.importActual('jotai')
  return { ...originalModule, useAtomValue: vi.fn() }
})

const mockedNoteForAdd: Note = {
  id: '',
  title: 'dummy title',
  content: 'dummy content',
}

describe('EditModal', () => {
  async function renderComponent() {
    return render(
      <>
        <EditModal />
        <Toaster />
      </>,
      { wrapper: Provider },
    )
  }

  describe('static render test', async () => {
    it('should render the correct content for add form with default values', async () => {
      // Arrange
      vi.mocked(useAtomValue).mockReturnValue(mockedNoteForAdd)

      await renderComponent()
      openModal('my_modal_5')

      // Act

      // Assert
      // const titleInputLocator = page.getByRole('textbox', { name: 'title' })
      const titleInputLocator = page.getByLabelText(/title/i)
      await expect.element(titleInputLocator).toBeInTheDocument()
      await expect.element(titleInputLocator).toHaveValue(mockedNoteForAdd.title)

      // const contentInputLocator = page.getByRole('textbox', { name: 'content' })
      const contentInputLocator = page.getByLabelText(/content/i)
      await expect.element(contentInputLocator).toBeInTheDocument()
      await expect.element(contentInputLocator).toHaveValue(mockedNoteForAdd.content)
    })
  })

  describe('user interactions', async () => {
    it('should render the toaster after user click the add button', async () => {
      // Arrange
      const user = userEvent.setup()

      vi.mocked(useAtomValue).mockReturnValue(mockedNoteForAdd)

      await renderComponent()
      openModal('my_modal_5')

      // Act
      const addButtonLocator = page.getByRole('button', { name: /add/i })
      await user.click(addButtonLocator)

      // // Assert
      const toastLocator = page.getByText(/created successfully/i)
      await expect.element(toastLocator).toBeInTheDocument()
    })
  })
})
