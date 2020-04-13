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

    <a data-test="post" class="panel-block" v-for="post in posts" :key="post.id">
      <div>
        <a>{{post.title}}</a>
        <div>{{ post.created.format('Do MMM') }}</div>
      </div>
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'

import { Period, Post } from './types'
import { todayPost, thisWeek, thisMonth } from './mocks'

export default defineComponent({
  setup() {
    const periods: Period[] = ['today', 'this week', 'this month']
    const selectedPeriod = ref<Period>('today')

    const posts = computed(() => [todayPost, thisWeek, thisMonth].filter(post => {
        if (
          selectedPeriod.value === 'today' &&
          post.created.isAfter(moment().subtract(1, 'day'))
        ) {
          return true
        }

        if (
          selectedPeriod.value === 'this week' &&
          post.created.isAfter(moment().subtract(7, 'day'))
        ) {
          return true
        }

        if (
          selectedPeriod.value === 'this month' &&
          post.created.isAfter(moment().subtract(1, 'month'))
        ) {
          return true
        }

        return false
      })
    )

    const setPeriod = (period: Period) => {
      selectedPeriod.value = period
    }

    return {
      periods,
      selectedPeriod,
      setPeriod,
      posts
    }
  }
})
</script>