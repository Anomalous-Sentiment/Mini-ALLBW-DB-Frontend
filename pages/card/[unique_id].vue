<template>
    <div class="flex-container">
        <div class="flex-element-side">
            Test
        </div>
        <div class="flex-element-main">
            <DataTable :value="gvg_skill_data" dataKey="0" filterDisplay="row" :sortOrder="1">

        <template #empty> No data found. </template>
        <template #loading> Loading memoria data. Please wait. </template>
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="key" header="Parameter">
            <template #body="{ data, index }">
                {{ data['key'] }}
            </template>
        </Column>
        <Column field="1" header="Value">
            <template #body="{ data, index }">
                {{ data['value'] }}
            </template>
        </Column>
      </DataTable>
        </div>
        <div class="flex-element-side">
            Test right
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    const uniqueId = route.params.unique_id
    const nf = new Intl.NumberFormat();

    const { data: gvg_skill_data, status: statusString } = await useAsyncData('gvg_skill', () => getSkillData())
    const { data: gvg_support_data, status: statusString2 } = await useAsyncData('gvg_support', () => getSupporSkillData())

    async function getSkillData()
    {
        const data = await $fetch('/api/skill_data', { query: { id: uniqueId } })
        const output = Object.entries(data[0]).map(([key, value]) => ({key,value}));
        console.log(output)
        return output
    }

    async function getSupporSkillData()
    {
        const data = await $fetch('/api/support_skill_data', { query: { id: uniqueId } })
        const output = Object.entries(data[0]).map(([key, value]) => ({key,value}));

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