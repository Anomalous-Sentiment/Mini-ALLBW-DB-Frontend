function toggleColorScheme() {
    const element = document.querySelector('html');
    element.classList.toggle('app-dark-mode');
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        toggleColorScheme()
    })
  })
  
  