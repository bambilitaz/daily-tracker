<template>
  <UCard class="hover:bg-gray-50 hover:ring-4 hover:ring-gray-200">
    <NuxtLink :to="`/members/${profile.id}`">
      <div class="font-semibold' relative flex items-center gap-8">
        <img
          :src="avatar"
          :alt="profile.display_name"
          class="ring-primary w-20 rounded-xl ring-4"
        />
        <div>
          <h2 class="font-bold">
            {{ profile.display_name.replace('@finema.co', '').toUpperCase() }}
          </h2>
          <h4 class="text-gray-400">
            {{ profile.display_name }}
          </h4>
        </div>
        <UBadge color="primary" variant="soft" class="absolute right-0 top-0 font-bold">{{
          profile.team.toUpperCase()
        }}</UBadge>
      </div>
    </NuxtLink>
  </UCard>
</template>

<script lang="ts" setup>
import { createAvatar } from '@dicebear/core'
import { dylan } from '@dicebear/collection'

const props = defineProps<{
  profile: any
}>()

const avatar = computed(() =>
  createAvatar(dylan, {
    seed: props.profile.display_name.replace('@finema.co', ''),
  }).toDataUri()
)
</script>
