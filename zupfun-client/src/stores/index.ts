import { defineStore } from 'pinia'
import { useAxios } from '@/utils/useAxios'
import { useWebSocket } from '@vueuse/core'
import { watch } from 'vue'

const ws = useWebSocket(`wss://${import.meta.env.VITE_API_URL}/ws`, {
  autoReconnect: {
    retries: 5,
    delay: 1000,
  },
})

watch(ws.data, (message) => {
  const body = JSON.parse(message)
  console.log(body)
  switch (body.event) {
    case 'getUserOrders':
      useMainStore().userOrders = body.data
      break
    case 'updateDishes':
      useMainStore().dishes = body.data
      break
    case 'updateOrders':
      useMainStore().orders = body.data
      break
  }
})

export const useMainStore = defineStore('main', {
  state: () => ({
    profileId: 1,
    dishes: [],
    orders: [],
    userOrders: [],
  }),
  getters: {
    axios: () => useAxios(),
    ws: () => ws,
  },
  actions: {
    async sendMessage(payload: { event: string, data: any }) {
      ws.send(JSON.stringify(payload))
    }
  },
})