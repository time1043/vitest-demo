import { http, HttpResponse } from 'msw/http'

import { notes } from './collections/note'
import { generateNote } from './faker/note'

const API_URL = import.meta.env.VITE_API_URL

await notes.createMany(10, (idx: number) => {
  return generateNote(idx + 1)
})

export const handlers = [
  http.get(`${API_URL}`, () => {
    return HttpResponse.json(notes.all())
  }),
  // https://mswjs.io/docs/http/intercepting-requests/path-parameters
  http.delete<{ id: string }>(`${API_URL}/:id`, ({ params }) => {
    const { id } = params

    // https://mswjs.io/ecosystem/data/querying
    const deletedNote = notes.delete((q) => q.where({ id }))

    return HttpResponse.json(deletedNote)
  }),
]
