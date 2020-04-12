import { mount } from '@vue/test-utils'
import Timeline from './Timeline.vue'

describe('Timeline', () => {
  it('renders 3 time periods', () => {
    const wrapper = mount(Timeline)
    
    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
  })
})