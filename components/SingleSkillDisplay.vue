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
        <Column field="0" header="Parameter">
            <template #body="{ data, index }">
                {{ data['0'] }}
            </template>
        </Column>
        <Column field="1" header="Value">
            <template #body="{ data, index }">
                {{ data['1'] }}
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
const props = defineProps(['skillData', 'type', 'lang', 'title'])
const skillParamArray = computed(() => getFlattenedParams(props.type, props.skillData))


// Utility function
function flattenJSON(obj = {}, res = {}, extraKey = '')
{
   for(const key in obj){
      if(typeof obj[key] !== 'object'){
         res[extraKey + key] = obj[key];
      }else{
         flattenJSON(obj[key], res, `${extraKey}${key}.`);
      };
   };
   return res;
};

function getFlattenedParams(type, skillData)
{
    // Get the relevant json data (quest/gvg/auto)
    const paramKey = `${type}_json_params`

    // Flatten the json object
    const output = flattenJSON(skillData[paramKey])

    // Convert to an array
    const paramArray = Object.entries(output).map(([key, value]) => {
        return [key, value]
    })

    // Return as array for display
    return paramArray
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