import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import NewPost from './NewPost.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'NewPost',
      path: '/posts/new',
      component: NewPost
    },
  ]
})
