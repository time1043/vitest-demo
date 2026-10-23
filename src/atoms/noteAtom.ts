import { atom } from 'jotai'

import type { Note } from '@/types/Note'

export const noteAtom = atom<Note>({
  id: 999,
  title: 'Example Title',
  content: 'Example Content',
})
