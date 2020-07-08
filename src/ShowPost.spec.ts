import { mount } from '@vue/test-utils'
import ShowPost from './ShowPost.vue'
import flushPromises from 'flush-promises'
import * as mockData from './mocks'
import { createStore, initialState } from './store'
import { makeRouter } from './router'

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mockData.todayPost]
  })
}))

describe('ShowPost', () => {
  it('does not render an edit link when no users is logged in', async () => {
    const store = createStore()
    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store
        },
        plugins: [router]
      }
    })

    await flushPromises()
    console.log(wrapper.html())
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
  })

  it('does not render an edit link when not authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        currentUserId: '2'
      }
    })
    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store
        },
        plugins: [router]
      }
    })

    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
  })

  it('does render an edit link when authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        currentUserId: '1'
      }
    })
    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store
        },
        plugins: [router]
      }
    })

    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true)
  })
})
