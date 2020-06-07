import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import NewPost from './NewPost.vue'
import { store } from './store'

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
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
    return next({
      name: 'Home'
    })
  }

  next()
})
