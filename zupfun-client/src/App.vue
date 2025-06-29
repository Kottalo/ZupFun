<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { getCurrentInstance } from 'vue'

  app.instance = getCurrentInstance()

</script>