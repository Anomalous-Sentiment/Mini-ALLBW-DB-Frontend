<template>
    <div class="flex-container">
        <div class="flex-element-side">
            Test
        </div>
        <div class="flex-element-main">
            <DataTable :value="props.gvgSkillData" dataKey="key" filterDisplay="row" :sortOrder="1">

        <template #empty> No skill data found. </template>
        <template #loading> Loading skill data. Please wait. </template>
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
const props = defineProps(['loading', 'gvgSkillData'])
console.log(props.gvgSkillData)


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