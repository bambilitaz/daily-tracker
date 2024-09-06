<template>
  <NuxtLayout>
    <UCard class="min-h-[500px]">
      <h1 class="mb-4">All Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3">
        <ULink to="/dashboard/daily">
          <UCard class="bg-primary">
            <div class="flex gap-4">
              <UIcon name="mdi-calendar" class="w-12 h-12 text-white"/>
              <div>
                <h2 class="text-white font-bold">Daily Dashboard</h2>
                <h5 class="text-gray-200">สรุปรายวันของทุกคน</h5>
              </div>
            </div>
          </UCard>
        </ULink>
      </div>
    </UCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from 'moment'
definePageMeta({
  middleware: "auth",
})
</script>
