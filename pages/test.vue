<template>
  <NuxtLayout>
    <UCard class="min-h-[500px]">
      <Main />
    </UCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Main from '../features/Main/index.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
