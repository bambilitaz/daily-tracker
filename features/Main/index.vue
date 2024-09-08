<template>
  <div>Main</div>
</template>

<script lang="ts" setup>
// import moment from 'moment'
// import { type ITracker } from './types'
// import { useAsyncData } from 'nuxt/app'
// import { ref, computed, watch } from 'vue'

// const props = defineProps<{
//   date: string
// }>()

// const { auth } = useSupabaseClient()
// const {
//   data: { user },
// } = await auth.getUser()

// const client = useSupabaseClient()
// const trackerList = ref<ITracker[]>([])
// const previousDate = computed(() => moment(props.date).subtract(1, 'days').format('YYYY-MM-DD'))

// const nextDate = computed(() => moment(props.date).add(1, 'days').format('YYYY-MM-DD'))

// const displayDay = computed(() => moment(props.date).format('ddd'))
// const displayDate = computed(() => moment(props.date).format('D MMMM YYYY'))
// const showCreateForm = ref(false)

// const handleCreate = () => {
//   showCreateForm.value = true
// }

// const handleCancelCreate = () => {
//   showCreateForm.value = false
// }

// const handleSuccessCreate = () => {
//   showCreateForm.value = false
//   fetchTrackers(props.date)
// }

// const handleRefresh = () => {
//   fetchTrackers(props.date)
// }

// const fetchTrackers = async (date: string) => {
//   const { data: trackers } = await useAsyncData('trackers', async () => {
//     const { data } = await client
//       .from('trackers')
//       .select(
//         'id, tracker_date, tracker_type, project_id, projects (id, name, code), detail, timing, created_at, created_by'
//       )
//       .eq('created_by', user.id)
//       .eq('tracker_date', date)
//       .order('id', { ascending: true })

//     return data
//   })

//   trackerList.value = trackers
//   showCreateForm.value = false
// }

// fetchTrackers(props.date)

// watch(
//   () => props.date,
//   (date: string) => {
//     fetchTrackers(date)
//   }
// )
</script>
