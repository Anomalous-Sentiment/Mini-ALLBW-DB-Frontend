<template>
    <img :src="`/img/icons/card_type_${props.params.value}.png`" alt="Role Icon" width="32px" height="32px" :style="{filter: 'invert(' + props.params.schemeVal + ')'}" loading="lazy">
</template>

<script setup>
const props = defineProps()
</script>

<style scoped>

</style>