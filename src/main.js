import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import currency from '@/utils/currency'
import './theme.css'

createApp(App)
  .use(store)
  .use(router)
  .use(currency)
  .mount('#app')
