<template>
  <UCard>
    <h2 class="text-primary mb-4 flex items-center justify-between gap-2 text-2xl font-bold">
      Calendar
      <div class="bg-primary flex size-12 items-center justify-center rounded-full">
        <UIcon name="heroicons-outline:calendar-days" class="size-6 text-white" />
      </div>
    </h2>
    <VueDatePicker
      v-model="date"
      :enable-time-picker="false"
      :max-date="new Date()"
      inline
      auto-apply
      class="mx-auto"
    />
  </UCard>
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['select-date'])

const date = ref(new Date())

watch(date, () => {
  emit('select-date', date.value)
})
</script>

<style lang="scss">
.dp__main {
  @apply block !important;
  .dp__menu {
    @apply border-none !important;
  }
}
</style>
