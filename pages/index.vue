<template>
  <NuxtLayout>
    <Main />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Main from '~/features/Main/index.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
