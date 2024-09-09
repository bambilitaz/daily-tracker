<template>
  <div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
    <div class="col-span-1 flex flex-col gap-8 lg:col-span-2">
      <UCard class="order-2 lg:order-1">
        <div class="relative">
          <div>
            <h1 class="text-primary mb-4 text-3xl font-bold">Tasks of {{ displayUserName }}</h1>
            <h2 class="mb-8 font-bold">{{ displayDate }}</h2>
          </div>
          <img
            src="../../public/images/gp-welcome.png"
            class="absolute right-[-50px] top-[-90px] h-60 opacity-30 lg:opacity-100"
          />
        </div>
        <TrackerList readonly :user-id="user!.id" :date="currentDate" />
      </UCard>
      <div class="order-1 lg:order-2">
        <UButton icon="mdi-arrow-left" size="xl" to="/members" label="ย้อนกลับ" />
      </div>
    </div>
    <div class="col-span-1">
      <CalendarPickerWithUser :user-id="user!.id" @select-date="handleDateChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CalendarPickerWithUser from '~/components/CalendarPickerWithUser.vue'
import TrackerList from '~/components/TrackerList.vue'
import moment from 'moment'

const props = defineProps<{
  user: any
}>()

const currentDate = ref(moment().format('YYYY-MM-DD'))
const displayDate = computed(() => moment(currentDate.value).format('LL'))

const displayUserName = computed(() => props.user?.email?.replace('@finema.co', '').toUpperCase())

const handleDateChange = (date: Date) => {
  currentDate.value = moment(date).format('YYYY-MM-DD')
}
</script>
