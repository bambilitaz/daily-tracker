<template>
  <UCard class="w-full pt-4">
    <div class="relative">
      <div>
        <h1 class="text-primary mb-4 text-3xl font-bold">All Members</h1>
        <h2 class="mb-8 text-gray-400">เลือกดูรายคนจากสมาชิกทั้งหมด</h2>
      </div>
      <img
        src="../../public/images/gp-members.png"
        class="absolute right-0 top-[-90px] h-60 opacity-30 lg:opacity-100"
      />
    </div>
    <div class="mb-8 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
      <UFormGroup label="ค้นหาสมาชิก" class="my-4">
        <UInput v-model="search" placeholder="ค้นหาด้วยอีเมล" />
      </UFormGroup>
      <UFormGroup label="ตัวกรองทีม" class="my-4">
        <USelectMenu
          v-model="filterTeam"
          :options="teamOptions"
          placeholder="ตัวกรองทีม"
          value-attribute="value"
          option-attribute="label"
          searchable
        />
      </UFormGroup>
    </div>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <ProfileItem v-for="member in filteredMembers" :key="member.id" :profile="member" />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import ProfileItem from '~/components/ProfileItem.vue'
import { TEAM_OPTIONS } from '~/constants/team'

const client = useSupabaseClient()

const filterTeam = ref('')
const search = ref('')
const teamOptions = [{ label: 'ทั้งหมด', value: '' }, ...TEAM_OPTIONS]

const filteredMembers = computed(() => {
  const membersList = (members.value || []) as any[]

  if (search.value === '') {
    if (filterTeam.value === '') {
      return membersList
    }

    return membersList.filter((member: any) => member.team === filterTeam.value)
  }

  return membersList.filter((member: any) => {
    const memberName = member.display_name.toLowerCase()

    return memberName.includes(search.value.toLowerCase())
  })
})

const { data: members } = await useAsyncData<{ id: string; display_name: string; team: string }>(
  'all_profiles',
  async () => {
    const { data } = await client
      .from('profiles')
      .select('*')
      .order('display_name', { ascending: true })

    return data
  }
)

const displayUserName = computed(() => user?.email?.replace('@finema.co', '').toUpperCase())
</script>
