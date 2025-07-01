<template>
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
                Name
              </th>
              <th class="text-left">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { useMainStore } from '@/stores'

  useMainStore().sendMessage({
    event: 'testEvent',
    data: {a:1},
  })
</script>