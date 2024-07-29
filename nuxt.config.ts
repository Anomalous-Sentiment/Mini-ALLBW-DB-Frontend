// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
  "@prisma/nuxt", 
  "@pinia/nuxt",
  '@vueuse/nuxt',
],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: [
    '@/assets/global.css',
  ],
})