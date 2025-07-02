import { ElysiaWS } from 'elysia/ws'
import { eq } from 'drizzle-orm'
import * as schema from '@/db/schema'
import _ from 'lodash'

import db from '@/lib/db'

async function getOrders({ profileId = 0 }: { profileId?: number }) {
  const where: any = profileId ? eq(schema.orders.profile_id, profileId) : null

  return await db.query.orders.findMany({
    where: where,
    with: {
      items: {
        with: {
          dish: true,
          group: true,
        }
      }
    }
  })
}

async function getUserOrders(ws: ElysiaWS, data: any) {
  const userOrders = await getOrders({ profileId: data.profileId })

  ws.send({
    event: 'getUserOrders',
    data: userOrders,
  })
}

export async function eventHandler(ws: ElysiaWS, body: { event: string, data: any }) {
  switch (body.event) {
    case 'getUserOrders': {
      await getUserOrders(ws, body.data)

      break
    }

    case 'updateDishes': {

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

    case 'updateOrders': {
      ws.send({
        event: 'updateOrders',
        data: await getOrders({})
      })

      break
    }

    case 'submitOrder': {
      await db.transaction(async (tx) => {
        const [order] = await tx.insert(schema.orders).values({
          profile_id: body.data.profileId
        }).returning();

        const formatted = (body.data.selectedItems as {
          id: number;
          group: { id: number };
        }[]).map(item => ({
          order_id: order.id,
          dish_id: item.id,
          group_id: item.group.id,
        }));

        await tx.insert(schema.orderItems).values(formatted);
      });

      ws.send({
        event: 'updateUserOrders',
        data: await getOrders({})
      })

      ws.publish('admin', {
        event: 'updateOrders',
        data: await getOrders({})
      });

      await getUserOrders(ws, body.data)

      break;
    }
  }
}