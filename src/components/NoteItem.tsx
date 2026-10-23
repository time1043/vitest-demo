import { PencilLineIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { toast } from 'sonner'

import type { Note } from '@/types/Note'

import { noteAtom } from '@/atoms/noteAtom'
import { openModal } from '@/hooks/useModel'
import { deleteNoteById } from '@/services/apiNote'

export default function NoteItem({ note }: { note: Note }) {
  const queryClient = useQueryClient()
  const setNote = useSetAtom(noteAtom)

  const { mutate: deleteNote, isPending: isDeleting } = useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: deleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      toast.success('Note deleted successfully')
    },
  })

  function openEditModal() {
    setNote(note)
    openModal('my_modal_5')
  }

  return (
    <div className="collapse border border-base-300 bg-base-100">
      <input type="radio" name="my-accordion-1" defaultChecked />
      <div className="collapse-title flex items-center justify-between pr-3 font-semibold lg:text-4xl">
        {note.title}

        <div className="pointer-events-auto relative z-10 flex gap-2">
          <button
            className="btn btn-square cursor-pointer btn-accent lg:btn-lg"
            onClick={openEditModal}
            role="edit-button"
          >
            <PencilLineIcon size={24} weight="thin" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation()
              deleteNote(note.id)
            }}
            className="btn btn-square btn-error lg:btn-lg"
            role="delete-button"
          >
            {isDeleting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <TrashIcon size={24} weight="thin" />
            )}
          </button>
        </div>
      </div>

      <div className="collapse-content text-sm lg:text-lg">{note.content}</div>
    </div>
  )
}
