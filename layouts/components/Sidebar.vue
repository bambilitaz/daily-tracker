<template>
  <div
    class="bg-primary-700 flex flex-row items-center justify-between px-4 py-2 md:min-w-40 md:flex-col md:py-8"
  >
    <div class="flex w-full flex-row items-center md:flex-col md:space-x-0">
      <h1 class="mr-4 text-3xl font-bold text-white md:mb-10 md:mr-0">Daily</h1>
      <MenuUser class="order-last ml-auto md:order-none md:mb-10 md:ml-0" />
      <div class="space-x-2 md:flex md:flex-col md:items-center md:space-x-0 md:space-y-4">
        <MenuLink v-for="item in menuLinks" :key="item.to" :sidebar-item="item" />
      </div>
    </div>
    <div class="mt-auto text-center">
      <p class="mt-4 hidden text-xs font-bold text-white md:block">&copy; 2024 Finema Daily</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuLink from './MenuLink.vue'
import MenuUser from './MenuUser.vue'

const menuLinks = [
  {
    to: '/',
    icon: 'heroicons-outline:home',
  },
  {
    to: '/team-daily',
    icon: 'heroicons-outline:user-group',
  },
  {
    to: '/members',
    icon: 'heroicons-outline:identification',
  },
]
</script>
