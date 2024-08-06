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
      typeFilters: [
        {
          'name': 'R. Unit Atk',
          'key': 'card_type',
          'value': 1,
          'applied': false,
        },
        {
          'name': 'R. Ranged Atk',
          'key': 'card_type',
          'value': 2,
          'applied': false,
        },
        {
          'name': 'Sp. Unit Atk',
          'key': 'card_type',
          'value': 3,
          'applied': false,
        },
        {
          'name': 'Sp. Ranged Atk',
          'key': 'card_type',
          'value': 4,
          'applied': false,
        },
        {
          'name': 'Assistance',
          'key': 'card_type',
          'value': 5,
          'applied': false,
        },
        {
          'name': 'Obstruction',
          'key': 'card_type',
          'value': 6,
          'applied': false,
        },
        {
          'name': 'Healing',
          'key': 'card_type',
          'value': 7,
          'applied': false,
        },
      ],
      attributeFilters: [
        {
          'name': 'Fire',
          'key': 'attribute',
          'value': 1,
          'applied': false,
        },
        {
          'name': 'Water',
          'key': 'attribute',
          'value': 2,
          'applied': false,
        },
        {
          'name': 'Wind',
          'key': 'attribute',
          'value': 3,
          'applied': false,
        },
        {
          'name': 'Light',
          'key': 'attribute',
          'value': 4,
          'applied': false,
        },
        {
          'name': 'Dark',
          'key': 'attribute',
          'value': 5,
          'applied': false,
        },
      ],
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
      awakenedFilters: [
        {
          'name': 'Awakened',
          'key': 'awakened',
          'value': true,
          'applied': false,
        },
        {
          'name': 'Super Awakened',
          'key': 'super_awakened',
          'value': true,
          'applied': false,
        },
      ]
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
        this.typeFilters.forEach(obj => obj['applied'] = false)
        this.attributeFilters.forEach(obj => obj['applied'] = false)
        this.questSkillFilters.forEach(obj => obj['applied'] = false)
        this.gvgSkillFilters.forEach(obj => obj['applied'] = false)
        this.autoSkillFilters.forEach(obj => obj['applied'] = false)
        this.awakenedFilters.forEach(obj => obj['applied'] = false)
        this.applyFilters()
      },
      async applyFilters() 
      {
        var startTime = performance.now()
        var tempList = []
        // Get all skill filters to apply
        const filters = this.questSkillFilters.concat(this.gvgSkillFilters).concat(this.autoSkillFilters).filter(filterObj => filterObj['applied'])

        // Get all card type and attribute filters to apply
        const cardAttrFilters = this.typeFilters.concat(this.attributeFilters).filter(filterObj => filterObj['applied'])

        const appliedAwakenFilters = this.awakenedFilters.filter(obj => obj['applied'] == true)

        // Create an array of filter functions for skill effects
        const filterFunctions : Array<Function> = filters.map((filtObj : any) => {
          // Convert filter objects to functions
          // Checks if the value of filter key in obj is greater than 0 (i.e. exists)
          return (obj) => obj[filtObj['key']] > 0 ? true : false
        })

        // Create filter functions for card types and attributes
        const equalityFilters : Array<Function> = cardAttrFilters.map((filtObj : any) => {
          // Convert filter objects to functions
          // Checks if the value of filter key in obj is greater than 0 (i.e. exists)
          return (obj) => obj[filtObj['key']] == filtObj['value'] ? true : false
        })

        const awakenFilters : Array<Function> = appliedAwakenFilters.map((filtObj : any) => {
          // Convert filter objects to functions
          // Checks if the value of filter key in obj is greater than 0 (i.e. exists)
          return (obj) => obj[filtObj['key']] == filtObj['value'] ? true : false
        })

        const combinedFilterFunctions = filterFunctions.concat(equalityFilters).concat(awakenFilters)

        // Iterate through memoria list, running each element against filter functions and assign filtered results
        tempList = this.allMemoria.filter((element : Record<string, Object>) => {
          // Only return true if all filters return true for the current element (i.e. pass the check) also check if it passes the name filter
          return combinedFilterFunctions.every((func) => func(element))
        })

        // Apply text search filter at last step
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