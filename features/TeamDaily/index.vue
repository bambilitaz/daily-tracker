<template>
  <div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
    <div class="order-2 col-span-1 lg:order-1 lg:col-span-2">
      <UCard>
        <div class="relative">
          <div>
            <h1 class="text-primary mb-4 text-3xl font-bold">Team Daily Summary</h1>
            <h2 class="mb-8 font-bold">{{ displayDate }}</h2>
          </div>
          <img
            src="../../public/images/gp-team-daily.png"
            class="absolute right-[-20px] top-[-60px] h-60 opacity-30 lg:opacity-100"
          />
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
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <CardUserWithTrackers
            v-for="group in groupFilterTeam"
            :key="group.user_id"
            :group="group"
          />
        </div>
        <div v-else class="flex min-h-[300px] flex-col items-center justify-center gap-6">
          <p class="text-gray italic">ยังไม่มีข้อมูลของวันนี้</p>
        </div>
      </UCard>
    </div>
    <div class="order-1 col-span-1 lg:order-2">
      <CalendarPicker @select-date="handleDateChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CalendarPicker from '~/components/CalendarPicker.vue'
import CardUserWithTrackers from '~/components/CardUserWithTrackers.vue'
import moment from 'moment'
import { TEAM_OPTIONS } from '~/constants/team'

const currentDate = ref(moment().format('YYYY-MM-DD'))
const displayDate = computed(() => moment(currentDate.value).format('LL'))

const client = useSupabaseClient()
const trackerList = ref<ITracker[]>([])

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

const fetchTrackersForTeamDaily = async () => {
  const { data: trackersForTeamDaily } = await useAsyncData('trackers_for_team_daily', async () => {
    const { data } = await client
      .from('trackers')
      .select('*, projects (id, name, code), profiles:created_by (id, display_name, team)')
      .eq('tracker_date', currentDate.value)
      .order('id', { ascending: true })

    return data
  })

  trackerList.value = trackersForTeamDaily
}

fetchTrackersForTeamDaily()

const handleDateChange = (date: Date) => {
  currentDate.value = moment(date).format('YYYY-MM-DD')
  fetchTrackersForTeamDaily()
}
</script>
