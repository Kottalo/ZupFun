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
    case 'updateOrders':
      useMainStore().orders = body.data
      break
  }
})

export const useMainStore = defineStore('main', {
  state: () => ({
    dishes: [],
    orders: [],
  }),
  getters: {
    axios: () => useAxios(),
    ws: () => ws,
  },
  actions: {
    sendMessage(payload: { event: string, data: any }) {
      ws.send(JSON.stringify(payload))
    }
  },
})