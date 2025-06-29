import { Elysia } from "elysia"
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '@db/schema';
import postgres from 'postgres'
import cors from '@elysiajs/cors'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client, schema });

const result = await db.query.dishes.findMany();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .post("/getDishes", () => result)
  .listen(3001)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
