<template>
  <NuxtLayout>
    <Members />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Members from '~/features/Members/index.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
