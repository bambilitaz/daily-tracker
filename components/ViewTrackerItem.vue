<template>
  <div>
    <div class="border-l-8 border-l-primary rounded-lg ring-1 ring-gray-200 p-2">
      <div
        class="flex flex-col md:flex-row gap-2 text-primary md:items-center items-start"
      >
        <div class="flex gap-2">
          <UIcon name="mdi-clock" class="w-5 h-5 mb-1" />
          <p class="font-bold">{{ item.timing }} hr.</p>
          <p>{{ TRACKER_TYPE_LABEL[item.tracker_type] }}</p>
        </div>
        <UBadge
          :color="item.projects.code === 'non-project' ? 'gray' : 'primary'"
          variant="soft"
          ># {{ item.projects.name }}</UBadge
        >
      </div>
      <div class="mt-2">
        <p v-html="item.detail"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ITracker } from "./types";
import { TRACKER_TYPE_LABEL } from "../constants/tracker_types";
import TrackerUpdateForm from "./TrackerUpdateForm.vue";

const props = defineProps<{
  item: ITracker;
}>();
</script>
