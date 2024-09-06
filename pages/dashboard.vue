<template>
  <NuxtLayout>
    <h1>DASHBOARD</h1>
    <h1>Hello {{ user.email }}</h1>

    <UButton
      class="mt-3"
      icon="ph-lock"
      label="Logout"
      variant="outline"
      color="black"
      @click="handleSignOut"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const handleSignOut = async () => {
    await auth.signOut()
    navigateTo("/login")
}
</script>
