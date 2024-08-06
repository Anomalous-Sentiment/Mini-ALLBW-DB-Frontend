<template>
    <h3>
        {{ props.header }}
    </h3>
    <div class="grid">
        <div class="item" v-for="filter in props.filters">
            <ToggleButton v-model="filter['applied']" :onLabel="filter['name']" :offLabel="filter['name']">
                <template #icon>
                    <img v-if="filter['key'] == 'card_type'" :src="`/img/icons/${filter['key'] + '_' + filter['value']}.png`" alt="Role Icon" width="32px" height="32px" loading="lazy" :style="{'margin-right': '10px', 'filter': 'invert(' + schemeVal + ')'}">
                    <img v-else-if="filter['key'] == 'attribute'" :src="`/img/icons/${filter['key'] + '_' + filter['value']}.png`" alt="Role Icon" width="32px" height="32px" loading="lazy" :style="{'margin-right': '10px'}">
                </template>

            </ToggleButton>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['header', 'filters'])
const memoriaStore = useMemoriaStore()
const { schemeVal } = storeToRefs(memoriaStore)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.item {
margin: auto;
padding: 5px;
}

:deep(.p-togglebutton-content) {
    gap: 0;
}
</style>