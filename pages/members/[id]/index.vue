<template>
  <NuxtLayout>
    <MembersDetail :user="user" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import MembersDetail from '~/features/Members/Detail.vue'

const route = useRoute()

const client = useSupabaseClient()

const { data: profile } = await useAsyncData<{ id: string; display_name: string; team: string }>(
  'profiles_by_id',
  async () => {
    const { data } = await client.from('profiles').select('*').eq('id', route.params.id).single()

    return data
  }
)

const user = computed(() => {
  return { ...profile.value, email: profile.value?.display_name || '' }
})

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
