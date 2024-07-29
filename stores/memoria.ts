// Using the option API

export const useMemoriaStore = defineStore('memoriaStore', {
    state: () => ({
      allMemoria: [],
      memoria: [],
      language: 'en',
      textFilter: '',
      toggleableFilters: [
        {
          'name': 'Damage UP',
          'key': 'attack_magnification',
        },
        {
          'name': 'Sp. Atk UP',
          'key': 'buffer_magical_attack_magnification',
        },
        {
          'name': 'Sp. Def UP',
          'key': 'buffer_magical_defense_magnification',
        },
        {
          'name': 'Reg. Atk UP',
          'key': 'buffer_physical_attack_magnification',
        },
        {
          'name': 'Reg. Def UP',
          'key': 'buffer_physical_defense_magnification',
        },
        {
          'name': 'Sp. Atk DOWN',
          'key': 'debuffer_magical_attack_magnification',
        },
        {
          'name': 'Sp. Def DOWN',
          'key': 'debuffer_magical_defense_magnification',
        },
        {
          'name': 'Reg. Atk DOWN',
          'key': 'debuffer_physical_attack_magnification',
        },
        {
          'name': 'Reg. Def DOWN',
          'key': 'debuffer_physical_defense_magnification',
        },
        {
          'name': 'Healing UP',
          'key': 'recovery_magnification',
        },
        {
          'name': 'Support UP',
          'key': 'buffer_up_magnification',
        },
        {
          'name': 'MP DOWN',
          'key': 'use_sp_reduce_magnification',
        },
      ],
    }),
    actions: {
      async fetch() 
      {
        const nuxtApp = useNuxtApp()
        const queryParams = {
            lang: this.language
        }

        const data = await nuxtApp.$fetchMsgpack('/api/memoria', queryParams)

        this.allMemoria = data
        this.memoria = this.allMemoria
      },
      setLang(newLang : string) 
      {
        if (this.language != newLang)
        {
            this.language = newLang
        }
      },
      applyFilters(filters: Array<Object> = []) 
      {
        var tempList = []
        // Create an array of filter functions
        const filterFunctions : Array<Function> = filters.map((filtObj : any) => {
          // Convert filter objects to functions
          // Checks if the value of filter key in obj is greater than 0 (i.e. exists)
          return (obj) => obj[filtObj['key']] && obj[filtObj['key']] > 0 ? true : false
        })

        // Iterate through memoria list, running each element against filter functions and assign filtered results
        tempList = this.allMemoria.filter((element : Record<string, Object>) => {
          // Only return true if all filters return true for the current element (i.e. pass the check) also check if it passes the name filter
          return filterFunctions.every((func) => func(element))
        })

        this.memoria = tempList.filter((element) => element[`${this.language}_name`].toLowerCase().includes(this.textFilter.toLowerCase()))
      },
      getMemoriaSkills(uniqueId: Number)
      {
        const matches = this.allMemoria.filter((element) => element['unique_id'] == uniqueId)
        return matches
      }
    }

  })