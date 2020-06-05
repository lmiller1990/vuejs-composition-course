import { mount } from '@vue/test-utils'
import Signup from './Signup.vue'
import { createStore } from './store'

const mockHideModal = jest.fn()

jest.mock('./useModal', () => ({
  useModal: () => ({
    hideModal: mockHideModal
  })
}))

describe('Signup', () => {
  it('validates the form', async () => {
    const wrapper = mount(Signup, {
      global: {
        provide: {
          store: createStore()
        }
      }
    })

    await wrapper.find('#Username').setValue('a')
    await wrapper.find('#Password').setValue('a')
    expect(wrapper.html()).toContain('This field has a minimum length of 5 and a maximum length of 10')
    expect(wrapper.html()).toContain('This field has a minimum length of 10 and a maximum length of 40')

    await wrapper.find('#Username').setValue('a'.repeat(5))
    await wrapper.find('#Password').setValue('a'.repeat(10))
    expect(wrapper.html()).not.toContain('This field has a minimum length of 5 and a maximum length of 10')
    expect(wrapper.html()).not.toContain('This field has a minimum length of 10 and a maximum length of 40')

    await wrapper.find('form').trigger('submit.prevent')
    expect(mockHideModal).toHaveBeenCalled()
  })
})
