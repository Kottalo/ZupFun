import { Elysia } from "elysia"
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

async function main() {
  console.log(process.env.DATABASE_URL)
  // Disable prefetch as it is not supported for "Transaction" pool mode 
  const client = postgres(process.env.DATABASE_URL, { prepare: false })
  const db = drizzle({ client });
}
main();

const app = new Elysia()
  .get("/", () => "Hello Elysia").listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
