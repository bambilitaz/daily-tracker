// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui'],
  css: ['@/assets/styles/main.scss'],
})