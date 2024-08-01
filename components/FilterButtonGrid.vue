<template>
    <h3>
        {{ props.header }}
    </h3>
    <div class="grid">
        <div class="item" v-for="filter in props.filters">
            <ToggleButton v-model="filter['applied']" :onLabel="filter['name']" :offLabel="filter['name']" onIcon="filter-on"/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['header', 'filters'])

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.item {
margin: auto;
padding: 5px;
}

.filter-on {
    background-color: yellow;
}
:deep(.p-togglebutton-content) {
    gap: 0;
}
</style>