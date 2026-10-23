import { useQuery } from '@tanstack/react-query'

import type { Note } from '@/types/Note'

import { getNotes } from '@/services/apiNote'

import EditModal from './EditModal'
import ErrorAlert from './ErrorAlert'
import NoteItem from './NoteItem'
import NoteListSkeleton from './NoteListSkeleton'

export default function NoteList() {
  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })

  if (isLoading) {
    return <NoteListSkeleton />
  }

  if (isError) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  if (isSuccess) {
    return (
      <>
        {notes?.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
        <EditModal />
      </>
    )
  }
}
