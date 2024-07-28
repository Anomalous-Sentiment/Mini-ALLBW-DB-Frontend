// Using the option API

export const useMemoriaStore = defineStore('memoriaStore', {
    state: () => ({
      memoria: [],
      language: 'en'
    }),
    actions: {
      async fetch() 
      {
        const nuxtApp = useNuxtApp()
        const queryParams = {
            lang: this.language
        }
        const data = await nuxtApp.$fetchMsgpack('/api/memoria', queryParams)
        this.memoria = data
      },
      setLang(newLang : string) 
      {
        if (this.language != newLang)
        {
            this.language = newLang
        }
      }
    }

  })