<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="">Signout</button>
      </div>

      <div class="buttons" v-if="!auth">
        <button class="button" @click="signup">Signup</button>
        <button class="button" @click="signin">Signin</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
      <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'
import { useStore } from './store'

export default defineComponent({
  components: {
    Signup
  },

  setup() {
    const store = useStore()
    const auth = computed(() => store.getState().authors.currentUserId)
    const modal = useModal()

    const signin = () => {
      modal.showModal()
    }

    const signup = () => {
      modal.showModal()
      modal.component.value = Signup
    }

    return {
      component: modal.component,
      modal,
      auth,
      signup,
      signin,
    }
  }
})
</script>
