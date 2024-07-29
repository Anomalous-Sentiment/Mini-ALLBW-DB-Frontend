<template>

    <DataTable :value="skillParamArray" dataKey="key" filterDisplay="row" :sortOrder="1">
        <template #header>
            <div>
                <h2>
                    {{ props.title }}
                </h2>
                <Divider/>
                <h3>
                    <img :src="`/img/icons/${props.type}_icon.png`" alt="GvG Icon" height="16px"/>
                    {{ ' ' }}
                    <span >{{ props.skillData[`${props.type}_${props.lang}_name`] }}</span>
                </h3>
                <p>
                    {{ props.skillData[`${props.type}_${props.lang}_desc`] }}
                </p>
            </div>
        </template>
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
        <Column field="value" header="Value">
            <template #body="{ data, index }">
                {{ data['value'] }}
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
const props = defineProps(['skillData', 'type', 'lang', 'title'])
const skillParamArray = computed(() => processData(props.type, props.skillData))

function processData(type, unprocessedData)
{
    const output = []
    if (unprocessedData)
    {
        Object.entries(unprocessedData).forEach(([key, value]) => {
            // Check if key contains magnification as substring
            if(key.includes('magnification') && key.includes(type))
            {
                // Check if value not null
                if(value)
                {
                    // Add to output array
                    output.push({key, value})
                }
            }
        })
    }

    return output
}
</script>

<style scoped>
h2 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
}

h3 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
}

p {
    margin-block-start: 0;
    margin-block-end: 0;
}
</style>