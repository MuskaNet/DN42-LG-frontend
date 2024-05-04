import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import config from '@/config'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/main.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
