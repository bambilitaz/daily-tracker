<template>
  <NuxtLayout>
    <UCard class="min-h-[500px]">
      <ULink to="/dashboard/daily">Daily Dashboard</ULink>
    </UCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from 'moment'
definePageMeta({
  middleware: "auth",
})
</script>
