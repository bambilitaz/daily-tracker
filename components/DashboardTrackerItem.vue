<template>
  <div>
    <div class="border-l-primary border-l-4 bg-gray-50 p-2">
      <div class="text-primary flex flex-col items-start gap-2 md:flex-row md:items-center">
        <div class="flex gap-2">
          <UIcon name="mdi-clock" class="mb-1 size-4" />
          <p class="text-sm font-bold">{{ item.timing }} hr.</p>
          <p class="text-sm">{{ TRACKER_TYPE_LABEL[item.tracker_type] }}</p>
        </div>
        <UBadge
          :color="item.projects.code === 'non-project' ? 'gray' : 'primary'"
          variant="soft"
          size="xs"
          class="text-xs"
        >
          # {{ item.projects.name }}
        </UBadge>
      </div>
      <div class="mt-2">
        <p v-html="item.detail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ITracker } from './types'
import { TRACKER_TYPE_LABEL } from '../constants/tracker_types'

defineProps<{
  item: ITracker
}>()
</script>
