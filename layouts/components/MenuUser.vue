<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'top-start' }"
  >
    <div class="size-10 overflow-hidden rounded-full ring-4 ring-white md:size-16">
      <ProfileAvatar :email="user?.email ?? 'anonymous'" />
    </div>
    <template #account="{ item }">
      <div class="text-left">
        <p class="text-sm">Signed in as</p>
        <p class="truncate font-semibold text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #signout="{ item }">
      <div class="flex w-full items-center justify-between" @click="handleSignOut">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="ms-auto size-4 shrink-0 text-gray-400 dark:text-gray-500" />
      </div>
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
const { auth } = useSupabaseClient()
const {
  data: { user },
} = await auth.getUser()

const items = [
  [
    {
      label: user?.email ?? 'anonymous',
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'ออกจากระบบ',
      icon: 'heroicons-outline:logout',
      slot: 'signout',
    },
  ],
]

const handleSignOut = async () => {
  await auth.signOut()
  navigateTo('/login')
}
</script>
