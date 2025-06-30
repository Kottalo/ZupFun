import {
  pgTable,
  integer,
  smallint,
  varchar,
  real
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Dishes
export const dishes = pgTable('dishes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  selection_id: integer(),
  name: varchar({ length: 16 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  price: real().default(1.2),
})

// Groups
export const dishGroups = pgTable('dish_groups', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 32 }).notNull(),
})

// Join Table: dish_to_group
export const dishToGroup = pgTable('dish_to_group', {
  dish_id: integer().notNull().references(() => dishes.id),
  group_id: integer().notNull().references(() => dishGroups.id),
})

// relation for dish_groups
export const dishGroupsRelations = relations(dishGroups, ({ many }) => ({
  dishLinks: many(dishToGroup), // connect to join table
}))

// relation for dishes
export const dishesRelations = relations(dishes, ({ many }) => ({
  groupLinks: many(dishToGroup),
}))

// relation for dish_to_group (join table)
export const dishToGroupRelations = relations(dishToGroup, ({ one }) => ({
  group: one(dishGroups, {
    fields: [dishToGroup.group_id],
    references: [dishGroups.id],
  }),
  dish: one(dishes, {
    fields: [dishToGroup.dish_id],
    references: [dishes.id],
  }),
}))