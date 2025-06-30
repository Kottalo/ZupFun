import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxios } from '@/utils/useAxios'

export const useMainStore = defineStore('main', {
  state: () => ({
    dishes: [],
  }),
  getters: {
    axios: () => useAxios(),
  },
  actions: {

  },
})