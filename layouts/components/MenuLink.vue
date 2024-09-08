<template>
  <UButton
    :to="sidebarItem.to"
    :icon="sidebarItem.icon"
    active-class="bg-white text-primary hover:text-primary"
    inactive-class="hover:bg-primary-600"
    size="xl"
    variant="ghost"
  />
</template>

<script lang="ts" setup>
defineProps<{
  sidebarItem: any
}>()
</script>
