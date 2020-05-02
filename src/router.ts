import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    }
  ]
})
