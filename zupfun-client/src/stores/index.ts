import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    dishes: ref([]),
  }),
  getters: {

  },
  actions: {

  },
})