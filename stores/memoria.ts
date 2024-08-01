// Using the option API

const generalSkills : Array<Object> = [
  {
    'name': 'Sp. Atk UP',
    'key': 'buffer_magical_attack_magnification',
    'applied': false,
  },
  {
    'name': 'Sp. Def UP',
    'key': 'buffer_magical_defense_magnification',
    'applied': false,
  },
  {
    'name': 'Reg. Atk UP',
    'key': 'buffer_physical_attack_magnification',
    'applied': false,
  },
  {
    'name': 'Reg. Def UP',
    'key': 'buffer_physical_defense_magnification',
    'applied': false,
  },
  {
    'name': 'Sp. Atk DOWN',
    'key': 'debuffer_magical_attack_magnification',
    'applied': false,
  },
  {
    'name': 'Sp. Def DOWN',
    'key': 'debuffer_magical_defense_magnification',
    'applied': false,
  },
  {
    'name': 'Reg. Atk DOWN',
    'key': 'debuffer_physical_attack_magnification',
    'applied': false,
  },
  {
    'name': 'Reg. Def DOWN',
    'key': 'debuffer_physical_defense_magnification',
    'applied': false,
  },
]

const supportSkills : Array<Object> = generalSkills.concat([
  {
    'name': 'Damage UP',
    'key': 'attack_up_magnification',
    'applied': false,
  },
  {
    'name': 'Healing UP',
    'key': 'recovery_up_magnification',
    'applied': false,
  },
  {
    'name': 'Support UP',
    'key': 'buffer_up_magnification',
    'applied': false,
  },
  {
    'name': 'MP DOWN',
    'key': 'use_sp_reduce_magnification',
    'applied': false,
  },
])

const mainSkills : Array<Object> = generalSkills.concat([
  {
    'name': 'Damage',
    'key': 'attack_magnification',
    'applied': false,
  },
  {
    'name': 'Healing',
    'key': 'recovery_magnification',
    'applied': false,
  },
])

export const useMemoriaStore = defineStore('memoriaStore', {
    state: () => ({
      schemeVal: 0,
      allMemoria: [],
      memoria: [],
      language: 'en',
      textFilter: '',
      questSkillFilters: mainSkills.map(obj => {
        const newObj = Object.assign({}, obj)
        newObj['key'] = 'quest_' + obj['key']
        return newObj
      }),
      gvgSkillFilters: mainSkills.map(obj => {
        const newObj = Object.assign({}, obj)
        newObj['key'] = 'gvg_' + obj['key']
        return newObj
      }),
      autoSkillFilters: supportSkills.map(obj => {
        const newObj = Object.assign({}, obj)
        newObj['key'] = 'auto_' + obj['key']
        return newObj
      }),
    }),
    actions: {
      async fetch() 
      {
        const nuxtApp = useNuxtApp()
        const queryParams = {
            lang: this.language
        }

        console.log('fetching memoria...')
        const data = await nuxtApp.$fetchMsgpack('/api/memoria', queryParams)

        this.allMemoria = data
        this.memoria = this.allMemoria
      },
      setLang(newLang : string) 
      {
        if (this.language != newLang)
        {
            this.language = newLang
            const { $event } = useNuxtApp()
            $event("language:changed")
        }
      },
      resetFilters()
      {
        this.questSkillFilters.forEach(obj => obj['applied'] = false)
        this.gvgSkillFilters.forEach(obj => obj['applied'] = false)
        this.autoSkillFilters.forEach(obj => obj['applied'] = false)
      },
      async applyFilters() 
      {
        var startTime = performance.now()
        var tempList = []
        // Get all filters to apply
        const filters = this.questSkillFilters.concat(this.gvgSkillFilters).concat(this.autoSkillFilters).filter(filterObj => filterObj['applied'])
        console.log(filters)
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


        var endTime = performance.now()

        console.log(`Call to applyFilters took ${endTime - startTime} milliseconds`)
      },
      getMemoriaSkills(uniqueId: Number)
      {
        const matches = this.allMemoria.filter((element) => element['unique_id'] == uniqueId)
        return matches
      },
    }

  })