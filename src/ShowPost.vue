<template>
  <Suspense>
    <template #default>
      <PostViewer />
    </template>
    <template #fallback>
      <div class="columns">
        <div class="column is-one-third" />
        <div class="column is-one-third">
          <Progress />
        </div>
        <div class="column is-one-third" />
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostViewer from './PostViewer.vue'
import Progress from './Progress.vue'

export default defineComponent({
  components: {
    PostViewer,
    Progress
  }
})
</script>
