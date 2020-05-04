<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input v-model="title" type="text" class="input" />
            {{ title }}
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-half">
        <div contenteditable id="markdown" ref="contentEditable" />
      </div>
      <div class="column is-one-half"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Post } from './types'

export default defineComponent({
  name: 'PostWriter',

  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },

  setup(props) {
    const title = ref(props.post.title)
    const contentEditable = ref<null | HTMLDivElement>(null)

    console.log(contentEditable.value)

    onMounted(() => {
      console.log(contentEditable.value)
      // ...
    })

    return {
      title,
      contentEditable
    }
  }
})
</script>
