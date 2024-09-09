<template>
  <div class="flex flex-col gap-8">
    <UCard>
      <h2 class="text-primary mb-4 flex items-center justify-between gap-2 text-2xl font-bold">
        Calendar
        <div class="bg-primary flex size-12 items-center justify-center rounded-full">
          <UIcon name="mdi:calendar-month-outline" class="size-6 text-white" />
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
    <UCard>
      <h2 class="text-primary flex items-center justify-between gap-2 text-2xl font-bold">
        Month Summary
        <div class="bg-primary flex size-12 items-center justify-center rounded-full">
          <UIcon name="mdi:chart-box-outline" class="size-6 text-white" />
        </div>
      </h2>
      <h4 class="mb-4 font-bold">{{ moment(date).format('MMMM YYYY') }}</h4>

      <h3 class="mb-4 font-bold">
        เวลางานทั้งหมดในเดือน
        <span class="text-primary text-4xl">{{ totalTrackedTiming }}</span> ชั่วโมง
      </h3>
      <h4 v-if="groupByProject.length > 0" class="mb-2 text-gray-400">แบ่งตามกลุ่มโปรเจ็ค</h4>
      <div
        v-for="groupProj in groupByProject"
        :key="groupProj.code"
        class="mb-4 rounded-xl p-2 ring-1 ring-gray-200"
      >
        <div
          class="bg-primary-50 text-primary mb-2 flex items-center justify-between rounded-lg px-2 py-1 font-semibold"
        >
          <p>{{ groupProj.name }}</p>
          <p class="text-lg font-bold">
            {{ groupProj.totalTiming }} ชั่วโมง
            <span class="text-sm text-gray-400">
              ({{ ((groupProj.totalTiming / totalTrackedTiming) * 100).toFixed(2) }}%)
            </span>
          </p>
        </div>
        <div
          v-for="groupType in groupProj.byTrackerType"
          :key="groupType.type"
          class="flex items-center justify-between"
        >
          <p class="text-sm text-gray-400">
            {{ TRACKER_TYPE_LABEL[groupType.type as TRACKER_TYPE] }}
          </p>
          <p class="text-sm text-gray-400">{{ groupType.totalTiming }} ชั่วโมง</p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { type ITracker } from './types'
import { type TRACKER_TYPE, TRACKER_TYPE_LABEL } from '~/constants/tracker_types'

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

const totalTrackedTiming = computed(() => {
  if (trackerList.value) {
    return trackerList.value.value.reduce((acc, item) => acc + item.timing, 0)
  }
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

const groupByTrackerType = (items: ITracker[]) => {
  const groupedMap = new Map<string, any>()

  for (const item of items) {
    if (!groupedMap.has(item.tracker_type)) {
      groupedMap.set(item.tracker_type, {
        type: item.tracker_type,
        items: [],
      })
    }

    groupedMap.get(item.tracker_type)!.items.push(item)
  }

  return Array.from(groupedMap.values())
    .sort((a, b) => (a.type < b.type ? -1 : 1))
    .map((group) => {
      return {
        ...group,
        totalTiming: group.items.reduce((acc, item) => acc + item.timing, 0),
      }
    })
}

const groupByProject = computed(() => {
  const groupedMap = new Map<string, any>()

  if (trackerList.value) {
    for (const item of trackerList.value.value) {
      if (!groupedMap.has(item.projects.code)) {
        groupedMap.set(item.projects.code, {
          code: item.projects.code,
          name: item.projects.name,
          items: [],
        })
      }

      groupedMap.get(item.projects.code)!.items.push(item)
    }

    return Array.from(groupedMap.values())
      .sort((a, b) => (a.code < b.code ? -1 : 1))
      .map((group) => {
        return {
          ...group,
          totalTiming: group.items.reduce((acc, item) => acc + item.timing, 0),
          byTrackerType: groupByTrackerType(group.items),
        }
      })
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
