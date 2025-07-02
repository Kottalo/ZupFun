<template>
  <v-card class="h-100" tile>
    <v-layout class="h-100">
      <v-app-bar
        flat
        color="pink"
        density="comfortable"
      >
        <v-toolbar-title>点单</v-toolbar-title>

        <v-btn icon="mdi-close" @click="router.push('/orderList')" />
      </v-app-bar>

      <v-main class="h-100">
        <v-container fluid class="h-100 d-flex flex-column">
          <v-card>
            <v-toolbar color="secondary" density="compact">
              <v-toolbar-title>选择物品</v-toolbar-title>
            </v-toolbar>
            
            <v-list>
              <template v-for="(item, index) in useMainStore().dishes"
                :key="index">
                <v-list-item
                  :value="item.id"
                  class="py-3"
                  :active="false"
                  @click="groupIndex = index;dialogTitle = item.name;dialog = true;"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>

                  <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{ selectedItems[index] ? selectedItems[index].name : '' }}</v-list-item-subtitle>

                  <v-list-item-subtitle class="text-high-emphasis">{{ selectedItems[index] ? 'RM ' + selectedItems[index].price.toFixed(2) : '' }}</v-list-item-subtitle>

                  <template v-slot:append>
                    <v-list-item-action class="align-end">

                      <v-img
                        v-if="selectedItems[index]"
                        width="100"
                        :aspect-ratio="16/9"
                        cover
                        :src="selectedItems[index].image"
                      ></v-img>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider v-if="index < useMainStore().dishes.length-1" class="ma-0"></v-divider>
              </template>
            </v-list>
          </v-card>

          <v-sheet class="flex-grow-1 d-flex align-end">
            <v-card class="w-100">
              <v-toolbar color="secondary" density="compact">
                <v-toolbar-title>清算</v-toolbar-title>
              </v-toolbar>
              
              <v-list lines="one">
                <v-list-item>
                  <v-list-item-title>总数</v-list-item-title>
                  <v-list-item-subtitle>RM {{ totalAmount }}</v-list-item-subtitle>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-btn block color="pink"
                    :disabled="!submittable"
                    @click="submitOrder"
                  >结账</v-btn>
                </v-list-item>
              </v-list>
            </v-card>
          </v-sheet>
        </v-container>
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
          <v-toolbar-title>{{ useMainStore().dishes[groupIndex].name }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <v-container>
            <v-row>
              <v-col
                v-for="dish in useMainStore().dishes[groupIndex].dishes"
                :key="dish.id"
                cols="6"
              >

                <v-card
                  :class="[
                    'fill-height'
                  ]"
                  elevation="4" 
                  @click="selectedItems[groupIndex] = dish;dialog = false"
                >
                  <v-img
                    class="align-end text-white fill-height"
                    :aspect-ratio="2 / 1.4"
                    :src="dish.image"
                    cover
                  >
                    <v-card-title
                      class="text-center text-black text-subtitle-1 pa-1"
                      style="background-color: rgba(255, 255, 255, 0.6);"
                    >
                      {{ dish.name }}
                    </v-card-title>
                  </v-img>
                </v-card>

              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import _ from 'lodash'
  import { useRouter } from 'vue-router'
  import { useMainStore } from '@/stores'
  
  import { shallowRef, reactive, computed, onMounted } from 'vue'

  const router = useRouter()
  
  const dialog = shallowRef(false)
  const dialogTitle = shallowRef('')

  const groupIndex = shallowRef(0)
  const selectedItems = reactive([null, null, null])

  onMounted(() => {
    useMainStore()
      .sendMessage({
        event: 'updateDishes',
        data: {}
      })
  })

  function submitOrder() {
    useMainStore().sendMessage({
      event: 'submitOrder',
      data: {
        profileId: useMainStore().profileId,
        selectedItems: selectedItems,
      },
    })
  }

  function checkSelected(dishId) {
    return selectedIds[groupIndex.value] == dishId
  }

  const totalAmount = computed(() => {
    const total = _.sumBy(selectedItems, item => item?.price ?? 0)
    return total.toFixed(2)
  })

  const submittable = computed(() =>
    _.every(selectedItems, item => item !== null)
  )
</script>