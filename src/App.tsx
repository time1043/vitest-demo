import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import Navbar from '@/components/Navbar'

import FloatingButton from './components/FloatingButton'
import NoteList from './components/NoteList'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <NoteList />

      <Toaster />
      <FloatingButton />
    </QueryClientProvider>
  )
}
