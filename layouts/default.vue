<template>
  <div class="bg-gray-100 min-h-screen">
    <UContainer>
      <div class="flex flex-col md:flex-row justify-between items-center py-8">
        <div class="flex items-baseline">
          <img
            src="https://cdn.prod.website-files.com/635a4be8c66f9db81341f2e8/635abfa6d1ec697da9b3da29_Group.svg"
            class="h-[36px]"
          />
          <h2 class="font-bold ml-4">Daily Tracker</h2>
        </div>

        <div v-if="user" class="flex flex-col md:flex-row items-center md:gap-4">
          <p>
            Welcome <span class="font-semibold">{{ user.email }}</span>
          </p>
          <UButton icon="mdi-logout" label="ออกจากระบบ" @click="handleSignOut" />
        </div>
      </div>
      <slot />
    </UContainer>
    <UNotifications />
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const handleSignOut = async () => {
  await auth.signOut();
  navigateTo("/login");
};
</script>
