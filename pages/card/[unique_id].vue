<template>
    <SkillsDisplay :gvgSkillData="gvgSkillData">

    </SkillsDisplay>
</template>

<script setup>
    const route = useRoute()
    const uniqueId = route.params.unique_id
    const nf = new Intl.NumberFormat();

    const { data: gvgSkillData, status: statusString } = await useAsyncData('gvg_skill', () => getSkillData())
    const { data: gvgSupportSkillData, status: statusString2 } = await useAsyncData('gvg_support', () => getSupporSkillData())

    async function getSkillData()
    {
        const output = []
        const data = await $fetch('/api/skill_data', { query: { id: uniqueId } })
        Object.entries(data[0]).forEach(([key, value]) => {
            // Check if key contains magnification as substring
            if(key.includes('magnification'))
            {
                // Check if value not null
                if(value)
                {
                    // Add to output array
                    output.push({key, value})
                }
            }
        })
        // const output = Object.entries(data[0]).map(([key, value]) => ({key,value}));
        const entries = Object.entries(data[0]);
        return output
    }

    async function getSupporSkillData()
    {
        const output = []
        const data = await $fetch('/api/support_skill_data', { query: { id: uniqueId } })
        // const output = Object.entries(data[0]).map(([key, value]) => ({key,value}));
        Object.entries(data[0].forEach(([key, value]) => {
            // Check if key contains magnification as substring
            if(key.includes('magnification'))
            {
                // Check if value not null
                if(value)
                {
                    // Add to output array
                    output.push({key, value})
                }
            }
        }));

        return output
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