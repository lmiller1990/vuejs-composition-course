<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a v-for="period in periods" :key="period" data-test="period">
        {{ period }}
      </a>
    </p>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Period } from './types'

export default defineComponent({
  setup() {
    const periods: Period[] = ['today', 'this week', 'this month']

    return {
      periods
    }
  }
})
</script>