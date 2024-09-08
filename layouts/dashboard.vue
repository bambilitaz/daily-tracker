<template>
  <div class="min-h-screen bg-gray-100 pb-2">
    <UContainer>
      <div class="flex flex-col justify-between py-4 md:flex-row md:items-center">
        <div class="flex items-baseline">
          <img
            src="https://cdn.prod.website-files.com/635a4be8c66f9db81341f2e8/635abfa6d1ec697da9b3da29_Group.svg"
            class="h-[36px]"
          />
          <h2 class="ml-4 font-bold">Daily Tracker</h2>
        </div>
        <div class="my-4 flex flex-col md:flex-row md:gap-8">
          <ULink
            to="/"
            active-class="text-primary font-semibold"
            inactive-class="text-gray-500 hover:text-gray-700"
          >
            Home
          </ULink>
          <ULink
            to="/dashboard"
            active-class="text-primary font-semibold"
            inactive-class="text-gray-500 hover:text-gray-700"
          >
            Dashboard
          </ULink>
        </div>
        <div v-if="user" class="flex items-center justify-between gap-4 md:justify-end">
          <p>
            Welcome <span class="font-semibold">{{ user.email }}</span>
          </p>
          <UButton icon="mdi-logout" label="ออกจากระบบ" @click="handleSignOut" />
        </div>
      </div>
      <slot />
      <div class="my-4 flex justify-end">
        <p class="text-primary font-semibold">&copy; 2024 Finema Daily Tracker</p>
      </div>
    </UContainer>
    <UNotifications />
    <UModals />
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const handleSignOut = async () => {
  await auth.signOut()
  navigateTo('/login')
}
</script>
