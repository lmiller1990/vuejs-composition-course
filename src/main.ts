import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './mocks'
import 'highlight.js/styles/solarized-dark.css'
import random from 'lodash/random'

import { router } from './router'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay(1000)
    return Promise.resolve({
      data: [
        mockData.thisWeek,
        mockData.todayPost,
        mockData.thisMonth,
        mockData.rollup,
        mockData.asyncComponents,
        mockData.testing,
      ]
    })
  }
}

// @ts-ignore
axios.put = async (url: string, payload: Post) => {
  if (url === '/posts') {
    await delay(1000)
    return Promise.resolve({
      data: payload
    })
  }
}


// @ts-ignore
axios.post = async (url: string, payload: Post) => {
  if (url === '/posts') {
    await delay(1000)
    const id = random(100, 10000)
    return Promise.resolve({
      data: {...payload, id}
    })
  }

  if (url === '/users') {
    await delay(1000)
    const id = random(100, 10000)
    const { id: oldId, password, ...rest } = payload
    return Promise.resolve({
      data: {id, ...rest}
    })
  }
}

import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')

