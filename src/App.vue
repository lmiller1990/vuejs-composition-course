<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modal.hideModal"></button>
  </div>

  <section class="section">
    <div class="container">
      <NavBar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import NavBar from './NavBar.vue'
import { useModal } from './useModal'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },

  setup () {
    const modal = useModal()

    const style = computed(() => ({
      display: modal.visible.value ? 'block' : 'none'
    }))

    return {
      style,
      modal
    }
  }
})
</script>
