<template>
  <div>
    <div v-if="trackerList.value && trackerList.value.length > 0" class="space-y-4">
      <TrackerItem
        v-for="item in trackerList.value"
        :key="item.id"
        :item="item"
        @refresh="handleRefresh"
      />
      <div class="flex justify-end">
        <UButton
          v-if="!showCreateForm"
          icon="mdi-plus"
          size="lg"
          variant="outline"
          @click="handleCreate"
        >
          เพิ่มข้อมูล
        </UButton>
      </div>
    </div>
    <div
      v-else-if="!showCreateForm"
      class="flex min-h-[300px] flex-col items-center justify-center gap-6"
    >
      <p class="text-gray italic">ยังไม่มีข้อมูลของวันนี้</p>
      <UButton icon="mdi-plus" size="lg" variant="outline" @click="handleCreate">
        เพิ่มข้อมูล
      </UButton>
    </div>
    <TrackerCreateForm
      v-if="showCreateForm"
      :date="props.date"
      :user-id="props.userId"
      @cancel="handleCancelCreate"
      @success-create="handleSuccessCreate"
    />
  </div>
</template>

<script lang="ts" setup>
import { type ITracker } from './types'
import TrackerItem from './TrackerItem.vue'
import TrackerCreateForm from './TrackerCreateForm.vue'
import moment from 'moment';

const props = defineProps<{
  userId: string
  date: string
}>()

const client = useSupabaseClient()
const trackerList = ref<ITracker[]>([])
const showCreateForm = ref(false)

const handleCreate = () => {
  showCreateForm.value = true
}

const handleCancelCreate = () => {
  showCreateForm.value = false
}

const handleSuccessCreate = () => {
  showCreateForm.value = false
  fetchTrackers()
}

const handleRefresh = () => {
  fetchTrackers()
}

const fetchTrackers = async () => {
  console.log(props.date)
  const { data: trackers } = await useAsyncData('trackers', async () => {
    const { data } = await client
      .from('trackers')
      .select(
        'id, tracker_date, tracker_type, project_id, projects (id, name, code), detail, timing, created_at, created_by'
      )
      .eq('created_by', props.userId)
      .eq('tracker_date', props.date ? props.date : moment().format('YYYY-MM-DD'))
      .order('id', { ascending: true })

    return data
  })

  trackerList.value = trackers
  showCreateForm.value = false
}

fetchTrackers()

watch(
  () => props.date,
  (date: string) => {
    fetchTrackers()
  }
)
</script>
