import { createApp } from 'vue'
import { mount } from '@lmiller1990/vue-test-utils-next'

import App from './App.vue'

test('App', () => {
  const wrapper = mount(App)

  expect(wrapper.html()).toContain('Vue app')
})
