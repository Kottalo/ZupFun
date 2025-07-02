import { ElysiaWS } from 'elysia/ws'
import * as schema from '@/db/schema'
import _ from 'lodash'

import db from '@/lib/db'

export async function eventHandler(ws: ElysiaWS, body: { event: string, data: Object }) {
  switch (body.event) {
    case "updateDishes": {

      const groupsWithDishes = await db.query.dishGroups.findMany({
        with: {
          dishLinks: {
            with: {
              dish: true,
            }
          }
        }
      })

      const formatted = groupsWithDishes.map(group => ({
        id: group.id,
        name: group.name,
        dishes: group.dishLinks.map(link => ({
          id: link.dish.id,
          name: link.dish.name,
          price: link.dish.price,
          image: link.dish.image,
          group: _.omit(group, 'dishLinks'),
        })),
      }))

      ws.send({
        event: 'updateDishes',
        data: formatted
      })

      break
    }

    case "updateOrders": {
      const [order] = await db.insert(schema.orders).values({
        customer_name: 'Alice'
      }).returning()

      const formatted = _.map(body.data as
        {
          id: number
          group: { id: number }
        }[], item => ({
          order_id: order.id,
          dish_id: item.id,
          group_id: item.group.id,
        }))

      await db.insert(schema.orderItems).values(formatted)

      const orders = await db.query.orders.findMany({
        with: {
          items: {
            with: {
              dish: true,
              group: true,
            }
          }
        }
      })

      // console.log(JSON.stringify(orders, null, 2))

      ws.publish('chatroom', {
        event: 'updateOrders',
        data: orders
      })

      break
    }
  }
}