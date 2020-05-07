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
        <div contenteditable id="markdown" ref="contentEditable" @input="handleEdit" />
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { Post } from './types'
import { parse } from 'marked'

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
    const markdown = ref(props.post.markdown)
    const html = ref('')

    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText
    }

    watch(() => markdown.value, (value) => {
      html.value = parse(value)
    }, { immediate: true })

    onMounted(() => {
      contentEditable.value.innerText = markdown.value
    })

    return {
      html,
      title,
      contentEditable,
      handleEdit,
      markdown
    }
  }
})
</script>
