<template>
  <v-stepper v-model="step" alt-labels vertical class="fill-height d-flex flex-column">
    <!-- Stepper header -->
    <v-stepper-header class="flex-shrink-0">
      <template v-for="(item, index) in store.dishes" :key="index" :value="index">
        <v-stepper-item :value="index+1" title="选项A" :subtitle="selectedIds[index] != 0 ? getDish(index, selectedIds[index]).name : ''"></v-stepper-item>
        <v-divider v-if="index < store.dishes.length-1"></v-divider>
      </template>
    </v-stepper-header>

    <!-- Stepper content that expands -->
    <v-stepper-window class="flex-grow-1 overflow-auto" v-model="step">
      <v-stepper-window-item v-for="(item, index) in store.dishes" :key="index" :value="index+1">

        <v-container>
          <v-row>
            <v-col
              v-for="dish in item.dishes"
              :key="dish.id"
              cols="6"
            >
              
              <v-card
                :class="[
                  checkSelected(dish.id) ? 'opacity-100' : 'opacity-60',
                  'fill-height'
                ]"
                :elevation="checkSelected(dish.id) ? 10 : 4" 
                :color="checkSelected(dish.id) ? 'primary' : 'grey'" 
                @click="selectedIds[index] = dish.id"
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
        
      </v-stepper-window-item>

    </v-stepper-window>

    <v-stepper-actions @click:next="step+=1" @click:prev="step-=1">
      
    </v-stepper-actions>
  </v-stepper>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue'
import { useMainStore } from '@/stores'
import _ from 'lodash'

const store = useMainStore()

const step = ref(1)
const selectedIds = reactive([0, 0, 0])

function checkSelected(dishId) {
  return selectedIds[step.value] == dishId
}

function getDishesBySelectionId(selectionId) {
  return _.filter(store.dishes.value, { selection_id: selectionId })
}

function getDish(index, dishId) {
  return _.find(store.dishes[index].dishes, { id: dishId })
}
  
</script>