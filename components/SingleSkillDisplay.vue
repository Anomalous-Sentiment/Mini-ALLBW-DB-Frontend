<template>
    <DataTable :value="skillParamArray" dataKey="key" filterDisplay="row" :sortOrder="1">
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
</template>

<script setup>
const props = defineProps(['skillData', 'type'])
const skillParamArray = computed(() => processData(props.type, props.skillData))

function processData(type, unprocessedData)
{
    const output = []
    if (unprocessedData)
    {
        console.log(unprocessedData)
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