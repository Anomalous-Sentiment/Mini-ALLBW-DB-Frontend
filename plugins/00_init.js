function toggleColorScheme() {
    const element = document.querySelector('html');
    element.classList.toggle('app-dark-mode');
}

export default defineNuxtPlugin((nuxtApp) => {
    // Set to app to dark mode by default
    nuxtApp.hook('app:mounted', () => {
        toggleColorScheme()
    })
    // Provide a function to toggle app colour scheme
    nuxtApp.provide('toggleColorScheme', toggleColorScheme)
  })
  
  