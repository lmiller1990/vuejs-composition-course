<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="authenticated">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button">Sign out</button>
      </div>
      <div class="buttons" v-else>
        <button class="button" @click="showSigninModal">Sign in</button>
        <button class="button" @click="showSignupModal">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="visible">
      <component :is="modal.component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, markRaw, shallowRef } from 'vue'
import { useModal } from './useModal'
import { useStore } from './store'
import Signup from './Signup.vue'
import Signin from './Signin.vue'

export default defineComponent({
  components: {
    Signup,
    Signin
  },

  setup() {
    const store = useStore()
    const authenticated = computed(() => !!store.getState().authors.currentUserId)

    const modal = useModal()
    const showSignupModal = () => {
      modal.component = Signup
      modal.showModal()
    }

    const showSigninModal = () => {
      modal.component = Signin
      modal.showModal()
    }

    return {
      visible: modal.visible,
      modal: markRaw(modal),
      showSignupModal,
      showSigninModal,
      authenticated
    }
  }
})
</script>
