<template>
  <form @submit="submit">
    <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message" />
    <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message" />
  </form>
</template>

<script lang="ts">
import { required, length, validate, Status } from './validators'
import { defineComponent, computed, ref } from 'vue'
import FormInput from './FormInput.vue'

export default defineComponent({
  name: 'App',
  components: {
    FormInput
  },

  setup () {
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [ required(), length({ min: 5, max: 10 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [ required(), length({ min: 10, max: 40 })])
    })

    const submit = (e: any) => {
      // ...
    }

    return {
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

</style>
