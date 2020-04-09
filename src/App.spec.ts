import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

import App from './App.vue'

test('App', () => {
  const wrapper = mount(App)

  expect(wrapper.html()).toContain('Vue app')
})
