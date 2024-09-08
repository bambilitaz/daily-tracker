<template>
  <div class="bg-primary-800 flex min-h-screen items-center justify-center">
    <UContainer>
      <UCard class="w-[320px]">
        <div class="mb-8 flex justify-center">
          <img
            src="https://cdn.prod.website-files.com/635a4be8c66f9db81341f2e8/635abfa6d1ec697da9b3da29_Group.svg"
            class="h-[36px]"
          />
        </div>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UInput v-model="state.email" placeholder="อีเมล" />
          <UInput v-model="state.password" type="password" placeholder="รหัสผ่าน" />

          <div class="flex justify-end">
            <UButton type="submit" icon="mdi-login" label="เข้าสู่ระบบ" />
          </div>
        </UForm>
      </UCard>
    </UContainer>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()
const { auth } = useSupabaseClient()
const {
  data: { user },
} = await auth.getUser()

watchEffect(() => {
  if (user) {
    navigateTo('/')
  }
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Require password'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { error } = await auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password,
  })

  if (error) {
    toast.add({
      icon: 'mdi-close-circle',
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      description: error.message,
      color: 'red',
    })
  } else {
    navigateTo('/')
  }
}
</script>
