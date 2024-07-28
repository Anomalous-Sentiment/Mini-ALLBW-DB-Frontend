
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('debounce', (func, timeout) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func(...args);
          }, timeout);
        }
})
})
