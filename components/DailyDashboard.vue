<template>
  <div>
    <h1 class="text-center text-3xl font-bold">Team Daily Summary</h1>
    <div class="flex items-center justify-center">
      <span class="text-gray mr-2 text-base">{{ displayDay }}:</span>
      <span class="text-xl font-semibold">{{ displayDate }}</span>
    </div>
    <div class="flex justify-between">
      <div>
        <UButton icon="mdi-arrow-left-thick" label="วันก่อนหน้า" :to="`?date=${previousDate}`" />
      </div>
      <div v-if="!moment(nextDate).isSameOrAfter(moment())" class="text-right">
        <UButton trailing-icon="mdi-arrow-right-thick" label="วันถัดไป" :to="`?date=${nextDate}`" />
      </div>
    </div>
    <UFormGroup label="ตัวกรองทีม" class="my-4">
      <USelectMenu
        v-model="filterTeam"
        :options="teamOptions"
        placeholder="ตัวกรองทีม"
        searchable
      />
    </UFormGroup>
    <div
      v-if="trackerList.value && trackerList.value.length > 0"
      class="grid grid-cols-1 gap-4 lg:grid-cols-3"
    >
      <DashboardUserTrackers v-for="group in groupFilterTeam" :key="group.user_id" :group="group" />
    </div>
    <div v-else class="flex min-h-[300px] flex-col items-center justify-center gap-6">
      <p class="text-gray italic">ยังไม่มีข้อมูลของวันนี้</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { type ITracker } from './types'
import { TEAM_OPTIONS } from '../constants/team'
import DashboardUserTrackers from './DashboardUserTrackers.vue'

const props = defineProps<{
  date: string
}>()

const client = useSupabaseClient()
const trackerList = ref<ITracker[]>([])
const previousDate = computed(() => moment(props.date).subtract(1, 'days').format('YYYY-MM-DD'))

const nextDate = computed(() => moment(props.date).add(1, 'days').format('YYYY-MM-DD'))

const displayDay = computed(() => moment(props.date).format('ddd'))
const displayDate = computed(() => moment(props.date).format('D MMMM YYYY'))

const teamOptions = [{ label: 'ทั้งหมด', value: '' }, ...TEAM_OPTIONS]
const filterTeam = ref({ label: 'ทั้งหมด', value: '' })

const groupFilterTeam = computed(() => {
  if (filterTeam.value.value === '') return groupByUserTrackers.value

  return groupByUserTrackers.value.filter((group) => group.profiles.team === filterTeam.value.value)
})

const groupByUserTrackers = computed(() => {
  const groupedMap = new Map<string, any>()

  for (const item of trackerList.value.value) {
    if (!groupedMap.has(item.created_by)) {
      groupedMap.set(item.created_by, {
        created_by: item.created_by,
        profiles: item.profiles,
        tracker_date: item.tracker_date,
        items: [],
      })
    }

    groupedMap.get(item.created_by)!.items.push(item)
  }

  return Array.from(groupedMap.values()).sort((a, b) =>
    a.profiles.display_name < b.profiles.display_name ? -1 : 1
  )
})

const fetchTrackers = async (date: string) => {
  const { data: trackers } = await useAsyncData('trackers', async () => {
    const { data } = await client
      .from('trackers')
      .select('*, projects (id, name, code), profiles:created_by (id, display_name, team)')
      .eq('tracker_date', date)
      .order('id', { ascending: true })

    return data
  })

  trackerList.value = trackers
}

fetchTrackers(props.date)

watch(
  () => props.date,
  (date: string) => {
    fetchTrackers(date)
  }
)
</script>
