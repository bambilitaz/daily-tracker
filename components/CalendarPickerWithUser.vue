<template>
  <UCard>
    <h2 class="text-primary mb-4 flex items-center justify-between gap-2 text-2xl font-bold">
      Calendar
      <div class="bg-primary flex size-12 items-center justify-center rounded-full">
        <UIcon name="heroicons-outline:calendar-days" class="size-6 text-white" />
      </div>
    </h2>
    <VueDatePicker
      v-model="date"
      :enable-time-picker="false"
      :max-date="new Date()"
      :markers="markers"
      inline
      auto-apply
      class="mx-auto"
      @update-month-year="handleMonthYear"
    />
  </UCard>
</template>

<script lang="ts" setup>
import moment from 'moment'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['select-date'])

const props = defineProps<{
  userId: string
}>()

const client = useSupabaseClient()
const trackerList = ref()
const date = ref(new Date())

const markers = computed(() => {
  return groupByTrackDate.value.map((group) => {
    return {
      date: group.tracker_date,
      type: 'line',
      color: 'green',
    }
  })
})

const groupByTrackDate = computed(() => {
  const groupedMap = new Map<string, any>()

  if (trackerList.value) {
    for (const item of trackerList.value.value) {
      if (!groupedMap.has(item.tracker_date)) {
        groupedMap.set(item.tracker_date, {
          tracker_date: item.tracker_date,
          items: [],
        })
      }

      groupedMap.get(item.tracker_date)!.items.push(item)
    }

    return Array.from(groupedMap.values()).sort((a, b) =>
      a.tracker_date < b.tracker_date ? -1 : 1
    )
  }

  return []
})

const fetchTrackersByMonth = async (month: number, year: number) => {
  const { data: trackersByMonth } = await useAsyncData('trackers_by_month', async () => {
    const { data } = await client
      .from('trackers')
      .select(
        'id, tracker_date, tracker_type, project_id, projects (id, name, code), detail, timing, created_at, created_by'
      )
      .eq('created_by', props.userId)
      .eq('yearTracked', year)
      .eq('monthTracked', month)

    return data
  })

  trackerList.value = trackersByMonth
}

fetchTrackersByMonth(moment(date.value).month() + 1, moment(date.value).year())

const handleMonthYear = ({ instance, month, year }) => {
  fetchTrackersByMonth(month + 1, year)
}

watch(date, () => {
  emit('select-date', date.value)
})
</script>

<style lang="scss">
.dp__main {
  @apply block !important;
  .dp__menu {
    @apply border-none !important;
  }
}
</style>
