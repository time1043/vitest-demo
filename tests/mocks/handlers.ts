import { http, HttpResponse } from 'msw/http'

import jsonData from '../../data/note-mock.json' with { type: 'json' }

const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(`${API_URL}`, () => {
    const { notes } = jsonData
    return HttpResponse.json(notes)
  }),
]
