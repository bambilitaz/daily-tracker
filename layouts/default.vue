<template>
  <div class="bg-gray-100 min-h-screen pb-2">
    <UContainer>
      <div
        class="flex flex-col md:flex-row justify-between md:items-center py-4"
      >
        <div class="flex items-baseline">
          <img
            src="https://cdn.prod.website-files.com/635a4be8c66f9db81341f2e8/635abfa6d1ec697da9b3da29_Group.svg"
            class="h-[36px]"
          />
          <h2 class="font-bold ml-4">Daily Tracker</h2>
        </div>
        <div class="flex flex-col md:flex-row md:gap-8 my-4">
          <ULink
            to="/"
            active-class="text-primary font-semibold"
            inactive-class="text-gray-500 hover:text-gray-700"
            >Home</ULink
          >
          <ULink
            to="/dashboard"
            active-class="text-primary font-semibold"
            inactive-class="text-gray-500 hover:text-gray-700"
            >Dashboard</ULink
          >
        </div>
        <div
          v-if="user"
          class="flex justify-between md:justify-end items-center gap-4"
        >
          <p>
            Welcome <span class="font-semibold">{{ user.email }}</span>
          </p>
          <UButton
            icon="mdi-logout"
            label="ออกจากระบบ"
            @click="handleSignOut"
          />
        </div>
      </div>
      <slot />
      <div class="flex justify-end my-4">
        <p class="font-semibold text-primary">
          &copy; 2024 Finema Daily Tracker
        </p>
      </div>
    </UContainer>
    <UNotifications />
    <UModals />
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const handleSignOut = async () => {
  await auth.signOut();
  navigateTo("/login");
};
</script>
