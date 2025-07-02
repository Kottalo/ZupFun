import { Elysia, t } from 'elysia'
import cors from '@elysiajs/cors'

import { eventHandler } from '@/lib/eventHandler'

const app = new Elysia()
  .use(cors())
  .ws('/ws', {
    body: t.Object({
      event: t.String(),
      data: t.Any(),
    }),

    open(ws) {
      ws.subscribe('admin')
      console.log('🟢 Client connected')
    },

    async message(ws, body) {
      console.log(JSON.stringify(body, null, 2))

      await eventHandler(ws, body)
    },

    close(ws) {
      console.log('🔴 Client disconnected')
    },
  })

export default app