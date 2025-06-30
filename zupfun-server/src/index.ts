import { Elysia } from "elysia"
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '@db/schema';
import postgres from 'postgres'
import cors from '@elysiajs/cors'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client, schema });

const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Elysia')
  .post('/getDishes', async () => {
    const groupsWithDishes = await db.query.dishGroups.findMany({
      with: {
        dishLinks: {
          with: {
            dish: true,
          }
        }
      }
    })

    const simplified = groupsWithDishes.map(group => ({
      id: group.id,
      name: group.name,
      dishes: group.dishLinks.map(link => ({
        id: link.dish.id,
        name: link.dish.name,
        price: link.dish.price,
        image: link.dish.image,
      })),
    }))
    
    return simplified
  })
  .listen(3001)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
