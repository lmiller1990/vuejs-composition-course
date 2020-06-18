<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="authenticated">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="">Sign out</button>
      </div>

      <div class="buttons" v-else>
        <button class="button" @click="signin">Sign in</button>
        <button class="button" @click="signup">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
      <component :is="modal.component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, markRaw } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const modal = useModal()
    const store = useStore()

    const authenticated = computed(() => store.getState().authors.currentUserId)
    const signup = () => {
      modal.component = markRaw(Signup)
      modal.showModal()
    }
    const signin = () => {
      // modal.component = markRaw(Signin)
      modal.showModal()
    }

    return {
      modal,
      authenticated,
      signup,
      signin
    }
  }
})
</script>
