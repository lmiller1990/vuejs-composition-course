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
      <div class="notification is-info">
        <p>
          Learn to build this application with Vue.js 3, the Composition API, TypeScript, Vue Router 4 and Vue Test Utils!
          <a href="https://vuejs-course.com/">Vue.js Course.com</a> 👈🏼
        </p>
        <p>$10 off with <u>VUEJS_COURSE_10_OFF</u> disount code at the checkout &nbsp;🎉</p>
      </div>
      <NavBar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { required, length, validate, Status } from './validators'
import { defineComponent, computed, ref } from 'vue'
import NavBar from './NavBar.vue'
import FormInput from './FormInput.vue'
import { useModal } from './useModal'
import { provideStore } from './store'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    FormInput
  },

  setup () {
    provideStore()
    const modal = useModal()
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [ required(), length({ min: 5, max: 10 })])
    })

    const style = computed(() => ({
      display: modal.visible.value ? 'block' : 'none'
    }))

    return {
      usernameStatus,
      style,
      modal,
      username,
    }
  }
})
</script>
