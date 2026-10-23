import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { Activity, useEffect, useState } from 'react'
import { toast } from 'sonner'

import type { Note } from '@/types/Note'

import { noteAtom } from '@/atoms/noteAtom'
import { closeModal } from '@/hooks/useModel'
import { createNote as createNoteApi, updateNoteById } from '@/services/apiNote'

export default function EditModal() {
  const note = useAtomValue(noteAtom)
  const queryClient = useQueryClient()

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  // FIXME: Just for demo purposes
  const isUpdate = note.id === 999 ? false : true

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  const { mutate: updateNote, isPending: isUpdating } = useMutation({
    mutationKey: ['updateNote'],
    mutationFn: ({ id, note }: { id: number; note: Partial<Note> }) => updateNoteById(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      closeModal('my_modal_5')
      toast.success('Note updated successfully')
    },
  })

  const { mutate: createNote, isPending: isCreating } = useMutation({
    mutationKey: ['createNote'],
    mutationFn: createNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      closeModal('my_modal_5')
      toast.success('Note created successfully')
    },
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (isUpdate) {
      updateNote({
        id: note.id,
        note: {
          title,
          content,
        },
      })
    } else {
      createNote({
        title,
        content,
      })
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box w-full overflow-hidden p-0 shadow-2xl">
        {/* Modal content */}
        <div className="card shrink-0 bg-base-100">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter the note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Activity mode={title.length > 35 ? 'visible' : 'hidden'}>
                <div className="label text-red-600">Limit 35 Characters</div>
              </Activity>

              <label className="label">Content</label>
              <textarea
                className="textarea w-full"
                placeholder="Enter the note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Activity mode={content.length > 100 ? 'visible' : 'hidden'}>
                <div className="label text-red-600">Limit 100 Characters</div>
              </Activity>

              <button className="btn mt-4 btn-accent" onClick={handleSubmit}>
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>{isUpdate ? 'Update' : 'Add'}</>
                )}
              </button>
            </fieldset>
          </div>
        </div>

        {/* Modal actions */}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn absolute top-2 right-2 btn-circle btn-ghost text-2xl btn-sm">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
