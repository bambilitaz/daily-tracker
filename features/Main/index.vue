<template>
  <div class="grid w-full grid-cols-1 lg:grid-cols-3 lg:space-x-12 lg:space-y-0">
    <div class="col-span-2">
      <UCard>
        <div
          class="bg-primary mb-8 flex items-center justify-between rounded-full px-4 py-2 font-semibold text-white"
        >
          <UIcon name="heroicons-outline:chat" class="mr-2 size-6" />
          <p class="text-lg">Hi {{ displayUserName }} , How are you today ?</p>
        </div>
        <div class="relative">
          <div>
            <h1 class="text-primary mb-4 text-3xl font-bold">My Tasks</h1>
            <h2 class="mb-8 font-bold">{{ displayDate }}</h2>
          </div>
          <img
            src="../../public/images/gp-welcome.png"
            class="absolute right-[-50px] top-[-90px] h-60 opacity-30 lg:opacity-100"
          />
        </div>
        <TrackerList :user-id="user?.id" :date="currentDate" />
      </UCard>
    </div>
    <div class="col-span-1">
      <CalendarPickerWithUser :user-id="user?.id" @select-date="handleDateChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CalendarPickerWithUser from '~/components/CalendarPickerWithUser.vue'
import TrackerList from '~/components/TrackerList.vue'
import moment from 'moment'

const currentDate = ref(moment().format('YYYY-MM-DD'))
const displayDate = computed(() => moment(currentDate.value).format('LL'))

const { auth } = useSupabaseClient()
const {
  data: { user },
} = await auth.getUser()

const displayUserName = computed(() => user?.email?.replace('@finema.co', '').toUpperCase())

const handleDateChange = (date: Date) => {
  currentDate.value = moment(date).format('YYYY-MM-DD')
}
</script>
