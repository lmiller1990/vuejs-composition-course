import { createApp } from 'vue'

import App from './App.vue'

test('App', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp(App).mount(el)
  console.log(document.body.outerHTML)
})
