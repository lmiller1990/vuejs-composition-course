import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import NewPost from './NewPost.vue'
import ShowPost from './ShowPost.vue'
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
      name: 'ShowPost',
      path: '/posts/:id',
      component: ShowPost
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
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})
