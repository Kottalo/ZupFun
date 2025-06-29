<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { getCurrentInstance } from 'vue'
  import { useAxios } from '@/utils/useAxios'
  import { useMainStore } from '@/stores'

  app.instance = getCurrentInstance()
  app.store = useMainStore()
  app.axios = useAxios()

  app.axios.post('/getDishes').then((res) => {
    app.store.dishes.value = res.data
  })

</script>