<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="pink">
      <v-btn icon="mdi-menu"></v-btn>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-checkbox-marked-circle"></v-btn>
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

          <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{ selectedIds[index] != 0 ? getDish(index, selectedIds[index]).name : '' }}</v-list-item-subtitle>

          <v-list-item-subtitle class="text-high-emphasis">{{ selectedIds[index] != 0 ? 'RM ' + getDish(index, selectedIds[index]).price.toFixed(2) : '' }}</v-list-item-subtitle>

          <template v-slot:append>
            <v-list-item-action class="flex-column align-end">

              <v-img
                v-if="selectedIds[index] != 0"
                width="100"
                :aspect-ratio="16/9"
                cover
                :src="getDish(index, selectedIds[index]).image"
              ></v-img>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider v-if="index < useMainStore().dishes.length-1" class="ma-0"></v-divider>
      </template>
    </v-list>
  </v-card>

  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <!--
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        prepend-icon="mdi-cog"
        size="small"
        text="Settings"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    -->

    <v-card>
      <v-toolbar>
        <v-btn
          icon="mdi-close"
          @click="dialog = false"
        ></v-btn>

        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>

      </v-toolbar>

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
              @click="selectedIds[groupIndex] = dish.id;dialog = false"
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
    </v-card>
  </v-dialog>
</template>

<script setup>
  import _ from 'lodash'
  import { useMainStore } from '@/stores'
  
  import { shallowRef, ref, reactive } from 'vue'

  const items = [
    { id: 1, action: '15 min', headline: 'Brunch this weekend?', subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`, title: 'Ali Connors' },
    { id: 2, action: '2 hr', headline: 'Summer BBQ', subtitle: `Wish I could come, but I'm out of town this weekend.`, title: 'me, Scrott, Jennifer' },
    { id: 3, action: '6 hr', headline: 'Oui oui', subtitle: 'Do you have Paris recommendations? Have you ever been?', title: 'Sandra Adams' },
    { id: 4, action: '12 hr', headline: 'Birthday gift', subtitle: 'Have any ideas about what we should get Heidi for her birthday?', title: 'Trevor Hansen' },
    { id: 5, action: '18hr', headline: 'Recipe to try', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.', title: 'Britta Holt' },
  ]

  const selected = shallowRef([2])

  const dialog = shallowRef(false)
  const dialogTitle = shallowRef('')
  const notifications = shallowRef(false)
  const sound = shallowRef(true)
  const widgets = shallowRef(false)

  const groupIndex = ref(0)
  const selectedIds = reactive([0, 0, 0])

  function checkSelected(dishId) {
    return selectedIds[groupIndex.value] == dishId
  }

  function getDishesBySelectionId(selectionId) {
    return _.filter(useMainStore().dishes.value, { selection_id: selectionId })
  }

  function getDish(index, dishId) {
    return _.find(useMainStore().dishes[index].dishes, { id: dishId })
  }
</script>