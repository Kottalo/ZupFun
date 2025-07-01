import {
  pgTable,
  integer,
  varchar,
  real,
  timestamp,
  primaryKey,
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

// Relations for dish_groups
export const dishGroupsRelations = relations(dishGroups, ({ many }) => ({
  dishLinks: many(dishToGroup),
}))

// Relations for dishes
export const dishesRelations = relations(dishes, ({ many }) => ({
  groupLinks: many(dishToGroup),
}))

// Relation for dish_to_group
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

// Orders
export const orders = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  customer_name: varchar({ length: 64 }),
  created_at: timestamp('created_at').defaultNow(),
})

// Order Items (join table)
export const orderItems = pgTable(
  'order_items',
  {
    order_id: integer().notNull().references(() => orders.id),
    dish_id: integer().notNull().references(() => dishes.id),
    group_id: integer().notNull().references(() => dishGroups.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.order_id, t.group_id] }), // ✅ ensures 1 group per order
  })
)

// Relations for orders
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}))

// Relations for order_items
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  dish: one(dishes, {
    fields: [orderItems.dish_id],
    references: [dishes.id],
  }),
  group: one(dishGroups, {
    fields: [orderItems.group_id],
    references: [dishGroups.id],
  }),
}))
