import { mount } from '@vue/test-utils'
import PostWriter from './PostWriter.vue'
import { basePost } from './mocks'

describe('PostWriter', () => {
  it('composes a post and emits the new data', (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost
        }
      }
    })

    wrapper.find('[data-test="post-title"]').setValue('New post title')
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText = '### Content'
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger('input')

    setTimeout(() => {
      wrapper.find('[data-test="submit-post"]').trigger('click')
      expect(wrapper.emitted().save[0][0].title).toBe('New post title')
      expect(wrapper.emitted().save[0][0].markdown).toBe('### Content')
      expect(wrapper.emitted().save[0][0].html).toBe('<h3 id="content">Content</h3>\n')
      done()
    }, 550)
  })
})
