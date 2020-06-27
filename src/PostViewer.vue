<template>
  <router-link :to="to" class="button is-rounded is-link">
    <i class="fas fa-edit" />
  </router-link>
  <div>Post title is: {{ post.title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "./store";

export default defineComponent({
  async setup() {
    const route = useRoute()
    const store = useStore()
    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[id]

    return {
      post,
      to: `/posts/${post.id}/edit`
    }
  }
})
</script>
