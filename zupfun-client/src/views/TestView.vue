<template>
  <v-stepper v-model="step" alt-labels vertical class="fill-height d-flex flex-column">
    <!-- Stepper header -->
    <v-stepper-header class="flex-shrink-0">
      <v-stepper-item value="1" title="选项A" :subtitle="selectedId != 0 ? getDishById(selectedId).name : ''"></v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item value="2" title="选项B" :subtitle="selectedId2 != 0 ? getDishById(selectedId2).name : ''"></v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item value="3" title="选项C" />
    </v-stepper-header>

    <!-- Stepper content that expands -->
    <v-stepper-window class="flex-grow-1 overflow-auto">
      <v-stepper-window-item value="1">

        <div class="fixed-grid">
          <div class="grid">
              <v-card v-for="dish in getDishesBySelectionId(1)" class="fill-height" elevation="4" :variant="selectedId == dish.id ? 'outlined' : ''" color="selectedId == dish.id ? 'primary' : ''" @click="selectedId = dish.id">
                <v-img
                  class="align-end text-white fill-height"
                  :aspect-ratio="2 / 1.2"
                  :src="dish.image"
                  cover
                >
                  <v-card-title class="text-center text-black" style="background-color: rgba(255, 255, 255, 0.6);">
                    {{ dish.name }}
                  </v-card-title>
                </v-img>
              </v-card>

          </div>
        </div>
        
      </v-stepper-window-item>

    </v-stepper-window>

    <v-stepper-actions @click:next="step+=1" @click:prev="step-=1">
      
    </v-stepper-actions>
  </v-stepper>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import _ from 'lodash'

const step = ref(0)
const selectedId = ref(0)
const selectedId2 = ref(0)

onMounted(async () => {
  console.log(getDishesBySelectionId(1))
})

function getDishesBySelectionId(selectionId) {
  return _.filter(app.store.dishes.value, { selection_id: selectionId })
}

function getDishById(dishId) {
  console.log(_.find(dishes.value, { id: dishId }))
  return _.find(dishes.value, { id: dishId })
}
  
</script>