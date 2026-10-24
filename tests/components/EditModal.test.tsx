import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { render } from 'vitest-browser-react'

import EditModal from '@/components/EditModal'

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

  describe.skip('static render test', async () => {
    it('should', async () => {
      // Arrange
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
