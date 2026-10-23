import { atom } from 'jotai'

import type { Note } from '@/types/Note'

export const noteAtom = atom<Note>({
  id: '',
  title: 'Example Title',
  content: 'Example Content',
})
