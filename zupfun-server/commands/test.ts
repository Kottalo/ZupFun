import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import _ from 'lodash'

import * as schema from '@db/schema';

// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client });

const data = [{}]

const selected = _.map(data, user => _.pick(user, ['name', 'selection_id', 'image']))

// await db.insert(schema.dishes).values(selected);

await client.end()