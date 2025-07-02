import server from '@/lib/server'
import '@/lib/eventHandler'

server.listen(8000)

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`
)