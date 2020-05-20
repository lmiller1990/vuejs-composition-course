<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="modal.showModal">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
      Modal
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from './useModal'

export default defineComponent({
  setup() {
    return {
      modal: useModal()
    }
  }
})
</script>
