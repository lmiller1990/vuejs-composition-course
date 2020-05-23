<template>
  <div class="field">
    <label class="label" :for="name">{{ name }}</label>
    <div class="control">
      <input class="input" :type="type" :id="name" @input="handleInput" :value="modelValue" />
    </div>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    error: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
  },

  setup (props, ctx) {
    const handleInput = (event: any) => {
      ctx.emit('update:modelValue', event.target.value)
    }

    return {
      handleInput
    }
  }
})
</script>

