<template>
    <div v-for="skill in skillsList">
        <MemoriaSkillsDisplay :skillData="skill" :lang="language" :schemeVal="schemeVal"/>
        <br/>
        <Divider/>
    </div>

</template>

<script setup>
    const route = useRoute()
    const uniqueId = route.params.unique_id
    const memoriaStore = useMemoriaStore()
    const { language, schemeVal } = storeToRefs(memoriaStore)
    const nuxtApp = useNuxtApp()
    const { data: skillsList, refresh: refreshSkillData } = await useAsyncData('skillsList', () => getSkillsList())

    nuxtApp.$listen('language:changed', async() => {
        console.log('(Memo page)Language changed to: ' + language.value)
        refreshSkillData()

    })
    async function getSkillsList()
    {
        var skillArr = []
        // If memoria list has been filled, get data from the list
        skillArr = memoriaStore.getMemoriaSkills(parseInt(uniqueId))
        if ((!skillArr && skillArr.length > 0) || !skillArr[0][`${language.value}_name`])
        {
            // Not filled, get the data from the API using unique_id
            skillArr = await nuxtApp.$fetchMsgpack('/api/memoria', {unique_id: uniqueId, lang: language.value})
        }

        return skillArr
    }

</script>

<style scoped>
    .flex-container {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .flex-element-main {
        max-width: 33%;
        min-width: 33%;
    }

    .flex-element-side {
        flex: 1;

}
</style>