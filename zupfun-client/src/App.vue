<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  
  import { useMainStore } from '@/stores'

  useMainStore().axios.post('/getDishes').then((res) => {
    console.log(res.data)
    useMainStore().dishes = res.data
  })

</script>