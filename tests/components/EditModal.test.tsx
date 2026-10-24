import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'

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

      // Act
      // Assert
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
