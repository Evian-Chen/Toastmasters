import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
})

export default router
