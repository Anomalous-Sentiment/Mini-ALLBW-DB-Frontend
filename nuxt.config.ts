// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [// '@primevue/nuxt-module'
  "@prisma/nuxt"],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },
  components: {
    global: true
  },
  css: [
    '@/assets/global.css',
  ],
  image: {
    // Options
  }
})