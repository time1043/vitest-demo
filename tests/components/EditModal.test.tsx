import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'

import type { Note } from '@/types/Note'

import EditModal from '@/components/EditModal'
import { openModal } from '@/hooks/useModel'

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

describe('EditModal', () => {
  async function renderComponent() {
    const queryClient = new QueryClient()

    return render(
      <QueryClientProvider client={queryClient}>
        <EditModal />
        <Toaster />
      </QueryClientProvider>,
    )
  }

  describe('static render test', async () => {
    const mockedNoteForAdd: Note = {
      id: '1043',
      title: 'dummy title',
      content: 'dummy content',
    }

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

  describe.skip('user interactions', async () => {
    it('should', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
