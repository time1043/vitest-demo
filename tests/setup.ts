import '@/index.css'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { worker } from './mocks/server'

beforeAll(() => worker.start())
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())
