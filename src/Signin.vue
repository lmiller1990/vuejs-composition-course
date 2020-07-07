<template>
  <form @submit.prevent="submit">
    <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message" />
    <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message" />
    <p>
      <small>(Sign in with "password" as the password)</small>
    </p>
    <button :disabled="loading" class="button is-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import { required, length, validate, Status } from './validators'
import { defineComponent, computed, ref } from 'vue'
import FormInput from './FormInput.vue'
import { User } from './types'
import { useStore } from './store'
import { useModal } from './useModal'

export default defineComponent({
  name: 'Signin',
  components: {
    FormInput
  },

  setup () {
    const loading = ref(false)
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [])
    })

    const store = useStore()
    const modal = useModal()

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

    const submit = async (e: any) => {
      loading.value = true
      await delay(500)
      loading.value = false

      if (password.value !== 'password') {
        return
      }

      const user: User = {
        id: 1,
        password: '',
        username: 'username'
      }

      await store.signin(user)
      modal.hideModal()
    }

    return {
      loading,
      submit,
      usernameStatus,
      username,
      password,
      passwordStatus,
    }
  }
})
</script>

<style scoped>
form {
  background: white;
  padding: 15px;
}

p {
  margin-bottom: 10px;
}
</style>
