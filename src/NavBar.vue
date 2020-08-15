<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="authenticated">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="signOut">Sign out</button>
      </div>

      <div class="buttons" v-else>
        <button class="button" @click="signin">Sign in</button>
        <button class="button" @click="signup">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
      <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, markRaw } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'
import Signin from './Signin.vue'
import { useStore } from './store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const modal = useModal()
    const store = useStore()
    const router = useRouter()

    const authenticated = computed(() => store.getState().authors.currentUserId)
    const signup = () => {
      modal.component.value = markRaw(Signup)
      modal.showModal()
    }

    const signin = () => {
      modal.component.value = markRaw(Signin)
      modal.showModal()
    }

    const signOut = () => {
      store.signOut()
      router.push('/')
    }

    return {
      modal,
      component: modal.component,
      Signin,
      authenticated,
      signup,
      signOut,
      signin
    }
  }
})
</script>
