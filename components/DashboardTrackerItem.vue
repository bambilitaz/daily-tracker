<template>
  <div>
    <div class="border-l-4 border-l-primary p-2 bg-gray-50">
      <div
        class="flex flex-col md:flex-row gap-2 text-primary md:items-center items-start"
      >
        <div class="flex gap-2">
          <UIcon name="mdi-clock" class="w-4 h-4 mb-1" />
          <p class="font-bold text-sm">{{ item.timing }} hr.</p>
          <p class="text-sm">{{ TRACKER_TYPE_LABEL[item.tracker_type] }}</p>
        </div>
        <UBadge
          :color="item.projects.code === 'non-project' ? 'gray' : 'primary'"
          variant="soft"
          size="xs"
          class="text-xs"
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
