// import './assets/main.css'
import '@/assets/sass/reset.scss' // 清楚全局默认样式

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
