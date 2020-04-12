<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a v-for="period in periods" :key="period" data-test="period"
        :class="[ period === selectedPeriod ? 'is-active' : '']"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </p>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Period } from './types'

export default defineComponent({
  setup() {
    const periods: Period[] = ['today', 'this week', 'this month']
    const selectedPeriod = ref<Period>('today')

    const setPeriod = (period: Period) => {
      selectedPeriod.value = period
    }

    return {
      periods,
      selectedPeriod,
      setPeriod
    }
  }
})
</script>