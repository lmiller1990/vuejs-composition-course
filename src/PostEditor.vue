<template>
  <div>Post Editor</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "./store";

export default defineComponent({
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[id]
    const canEdit = post.authorId === parseInt(store.getState().authors.currentUserId!, 10)

    if (!canEdit) {
      router.push('/')
    }

    return {
      post,
      to: `/posts/${post.id}/edit`
    }
  }
})
</script>
