<template>
  <div>
    <TrackerUpdateForm
      v-if="showUpdateForm"
      :item="item"
      @cancel="handleCancelUpdate"
      @success-update="handleSuccessUpdate"
    />
    <div v-else class="border-l-primary rounded-lg border-l-8 p-2 ring-1 ring-gray-200">
      <div class="item-center flex justify-between">
        <div class="text-primary flex flex-col items-start gap-2 md:flex-row md:items-center">
          <div class="flex gap-2">
            <UIcon name="mdi-clock" class="mb-1 size-5" />
            <p class="font-bold">{{ item.timing }} hr.</p>
            <p>{{ TRACKER_TYPE_LABEL[item.tracker_type as TRACKER_TYPE] }}</p>
          </div>
          <UBadge :color="item.projects.code === 'non-project' ? 'gray' : 'primary'" variant="soft">
            # {{ item.projects.name }}
          </UBadge>
        </div>
        <div class="space-x-2">
          <UButton variant="soft" color="gray" trailing-icon="mdi-pencil" @click="updateTracker" />
          <UButton variant="soft" color="gray" trailing-icon="mdi-trash" @click="deleteTracker" />
        </div>
      </div>
      <div class="mt-2">
        <p v-html="item.detail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ITracker } from './types'
import { type TRACKER_TYPE, TRACKER_TYPE_LABEL } from '../constants/tracker_types'
import TrackerUpdateForm from './TrackerUpdateForm.vue'

const emit = defineEmits(['refresh'])

const props = defineProps<{
  item: ITracker
}>()

const showUpdateForm = ref(false)

const updateTracker = () => {
  showUpdateForm.value = true
}

const handleCancelUpdate = () => {
  showUpdateForm.value = false
}

const handleSuccessUpdate = () => {
  emit('refresh')
  showUpdateForm.value = false
}

const toast = useToast()
const client = useSupabaseClient()

const deleteTracker = async () => {
  const { error } = await client.from('trackers').delete().eq('id', props.item.id)

  if (error) {
    toast.add({
      icon: 'mdi-close-circle',
      title: 'ลบข้อมูลไม่สำเร็จ',
      description: error.message,
      color: 'red',
    })
  } else {
    emit('refresh')
  }
}
</script>
