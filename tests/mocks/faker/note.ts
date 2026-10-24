import { faker } from '@faker-js/faker'

import type { Note } from '@/types/Note'

export function generateNote(index: number = Date.now()): Note {
  return {
    id: String(index),
    title: faker.book.title(),
    content: faker.lorem.lines(2),
  }
}
