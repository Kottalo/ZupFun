import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

app
  .use(vuetify)
  .use(createPinia())
  .use(router)
  .mount('#app')
