<template>
  <img :src="avatar" :alt="name" class="size-full" />
</template>

<script lang="ts" setup>
import { createAvatar } from '@dicebear/core'
import { dylan } from '@dicebear/collection'

const props = defineProps<{
  email: string
}>()

const avatar = computed(() =>
  createAvatar(dylan, {
    seed: props.email.replace('@finema.co', ''),
  }).toDataUri()
)
</script>
