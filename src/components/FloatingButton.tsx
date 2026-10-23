import { PlusIcon } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'

import { noteAtom } from '@/atoms/noteAtom'
import { openModal } from '@/hooks/useModel'

export default function FloatingButton() {
  const setNote = useSetAtom(noteAtom)

  function openCreateModal() {
    // Set default values for a new note
    setNote({
      id: '',
      title: 'Example Title',
      content: 'Example Content',
    })
    openModal('my_modal_5')
  }

  return (
    <button
      onClick={openCreateModal}
      className="btn fixed right-6 bottom-6 z-50 btn-circle shadow-xl btn-lg btn-primary"
    >
      <PlusIcon size={52} weight="thin" />
    </button>
  )
}
