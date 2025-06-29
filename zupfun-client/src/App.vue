<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  
  import { useMainStore } from '@/stores'

  const store = useMainStore()

  store.axios.post('/getDishes').then((res) => {
    store.dishes.value = res.data
  })

</script>