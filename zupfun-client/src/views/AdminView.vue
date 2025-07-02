<template>
  <v-container fluid>
    <v-card tile>
      <v-layout>
        <v-app-bar
          flat
          color="pink"
          density="comfortable"
        >
          <v-toolbar-title>订单</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  订单号
                </th>
                <th class="text-left">
                  选项A
                </th>
                <th class="text-left">
                  选项B
                </th>
                <th class="text-left">
                  选项C
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in useMainStore().orders"
                :key="order.id"
              >
                <td>{{ order.id }}</td>
                <td>{{ order.items[0].dish.name }}</td>
                <td>{{ order.items[1].dish.name }}</td>
                <td>{{ order.items[2].dish.name }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-main>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useMainStore } from '@/stores'
  import { ref } from 'vue'
  
</script>