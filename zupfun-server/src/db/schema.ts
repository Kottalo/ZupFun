import { integer, smallint, pgTable, varchar, real } from "drizzle-orm/pg-core";

export const users = pgTable("dishes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  selection_id: smallint(),
  name: varchar({ length: 16 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  price: real().default(1.2),
});