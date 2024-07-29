<template>
    <div v-for="skill in skillsList">
        <MemoriaSkillsDisplay :skillData="skill"/>
    </div>

</template>

<script setup>
    const route = useRoute()
    const uniqueId = route.params.unique_id
    const nf = new Intl.NumberFormat();
    const memoriaStore = useMemoriaStore()
    const { allMemoria, language } = storeToRefs(memoriaStore)
    const nuxtApp = useNuxtApp()
    const { data: skillsList, status: statusString } = await useAsyncData('skillsList', () => getSkillsList())

    async function getSkillsList()
    {
        var skillArr = null
        if (allMemoria && allMemoria.value.length > 0)
        {
            // If memoria list has been filled, get data from the list
            skillArr = memoriaStore.getMemoriaSkills(parseInt(uniqueId))
        }
        else
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