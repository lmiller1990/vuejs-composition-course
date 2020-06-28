import { mount } from '@vue/test-utils'
import { makeRouter, createBeforeEach } from './router'
import ShowPost from './ShowPost.vue'
import { createStore, initialState } from './store'
import flushPromises from 'flush-promises'
import * as mockData from './mocks'

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mockData.todayPost]
  })
}))

test('cannot edit post', async () => {
  const router = makeRouter()
  const store = createStore()
  router.beforeEach(createBeforeEach(store))
  await router.push('/posts/1')
  const wrapper = mount(ShowPost, {
    global: {
      plugins: [
        router
      ],
      provide: {
        store
      }
    }
  })
  await router.isReady()
  await flushPromises()
  expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
})

test('can edit post', async () => {
  const router = makeRouter()
  const store = createStore({
    ...initialState(),
    authors: {
      ...initialState().authors,
      currentUserId: '1'
    }
  })
  router.beforeEach(createBeforeEach(store))
  await router.push('/posts/1')
  const wrapper = mount(ShowPost, {
    global: {
      plugins: [
        router
      ],
      provide: {
        store
      }
    }
  })
  await router.isReady()
  await flushPromises()
  expect(wrapper.find('[data-test="edit-link"]').exists()).toBe(true)
})
