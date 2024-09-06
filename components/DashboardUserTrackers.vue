<template>
  <UCard>
    <div class="mb-2">
      <div class="flex justify-between items-start">
        <div class="flex items-center font-semibold gap-2">
          <img :src="avatar" :alt="group.profiles.display_name" class="rounded w-10"/>
          <div>
            <h4>{{ group.profiles.display_name.replace('@finema.co', '').toUpperCase() }}</h4>
            <h6 class="font-light text-gray-400">{{ group.profiles.display_name }}</h6>
          </div>
        </div>
        <h6 class="font-bold text-gray-400">{{ moment(group.tracker_date).format('DD/MM/YYYY') }}</h6>
      </div>
      <h5 class="bg-primary text-white my-2 rounded-lg flex justify-between items-center px-2">
        <span class="text-xs">Total time tracked</span> 
        <span class="font-semibold">{{ totalTime }} hr.</span>
      </h5>
    </div>
    <div
      v-if="group.items && group.items.length > 0"
      class="space-y-2"
    >
      <DashboardTrackerItem
        v-for="item in group.items"
        :key="item.id"
        :item="item"
      />
    </div>
    <div v-else class="min-h-[300px] flex flex-col items-center justify-center gap-6">
      <p class="text-gray italic">ยังไม่มีข้อมูลของวันนี้</p>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import moment from "moment";
import { createAvatar } from '@dicebear/core';
import { dylan } from '@dicebear/collection';
import { type ITracker } from "./types";
import DashboardTrackerItem from "./DashboardTrackerItem.vue";
const props = defineProps<{
  group: any;
}>();

const avatar = computed(() => createAvatar(dylan, {
  seed: props.group.profiles.display_name.replace('@finema.co', ''),
}).toDataUri())

const totalTime = computed(() => {
  return props.group.items.reduce((sum, item)  => sum + item.timing , 0)
})
</script>
