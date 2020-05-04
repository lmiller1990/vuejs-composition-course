<template>
  <section class="section">
    <div class="container">
      <NavBar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
})
</script>
