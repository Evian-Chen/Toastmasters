import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = true;

// 設置 axios 全局基礎 URL
axios.defaults.baseURL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
