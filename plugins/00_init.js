function toggleColorScheme() {
    const element = document.querySelector('html');
    element.classList.toggle('app-dark-mode');
}

export default defineNuxtPlugin((nuxtApp) => {
    // Set to app to dark mode by default
    nuxtApp.hook('app:beforeMount', () => {
        // Class is currently set to dark mode on server side. If not server side rendered, then un-comment this to apply on client side
        // toggleColorScheme()
    })
    // Provide a function to toggle app colour scheme
    nuxtApp.provide('toggleColorScheme', toggleColorScheme)
  })
  
  