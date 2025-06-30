import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import _ from 'lodash'
import { sql } from 'drizzle-orm'
import * as schema from '@db/schema';

// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client, schema });

const groupsWithDishes = await db.query.dishGroups.findMany({
  with: {
    dishLinks: {
      with: {
        dish: true, // include the actual dish
      }
    }
  }
})

console.log(groupsWithDishes)


await client.end()