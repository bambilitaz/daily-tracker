<template>
  <NuxtLayout>
    <UCard class="min-h-[500px]">
      <DailyList :date="currentDate" />
    </UCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from 'moment'
import DailyList from '../components/DailyList.vue'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const currentDate = computed(() => {
  if (route.query.date) {
    return route.query.date
  }

  return moment().format('YYYY-MM-DD')
})
</script>
