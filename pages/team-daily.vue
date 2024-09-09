<template>
  <NuxtLayout>
    <TeamDaily />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import TeamDaily from '~/features/TeamDaily/index.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
