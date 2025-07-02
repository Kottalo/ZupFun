<template>
  <v-card class="h-100" tile>
    <v-layout class="h-100">
      <v-app-bar
        flat
        color="pink"
        density="comfortable"
      >
        <v-toolbar-title>我的订单</v-toolbar-title>

        <v-btn
          prepend-icon="mdi-pencil-box-outline"
          variant="text"
          size="large"
          @click="router.push('/order')"
        >
          点单

          <template v-slot:append>
            <v-icon color="warning"></v-icon>
          </template>
        </v-btn>
      </v-app-bar>

      <v-main class="h-100">
        <v-list>
          <template v-for="order in useMainStore().userOrders">
            <v-list-item
              
            >
              <v-list-item-title>订单{{ order.id }}</v-list-item-title>

              <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100"></v-list-item-subtitle>

              
            </v-list-item>

            <v-divider class="ma-0"></v-divider>
          </template>
        </v-list>
      </v-main>
    </v-layout>
  </v-card>

  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
      <v-layout>
        <v-app-bar
          flat
          color="pink"
          density="comfortable"
        >
          <v-btn icon="mdi-close" @click="dialog = false" />
          <v-toolbar-title>{{  }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <v-container>
            
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useMainStore } from '@/stores'
  
  import { shallowRef, reactive, computed, onMounted } from 'vue'

  const router = useRouter()
  
  const dialog = shallowRef(false)
  const dialogTitle = shallowRef('')

  useMainStore()
  .sendMessage({
    event: 'getUserOrders',
    data: { profileId: useMainStore().profileId }
  })
</script>