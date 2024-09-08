<template>
  <div>
    <div class="bg-primary-700 flex h-full min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div
        class="flex size-full min-h-screen rounded-t-3xl bg-gray-300 px-4 md:px-16 py-12 md:rounded-l-3xl md:rounded-r-none"
      >
        <slot />
      </div>
    </div>
    <UNotifications />
    <UModals />
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
</script>
