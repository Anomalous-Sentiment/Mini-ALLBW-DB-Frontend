<template>
    <img :src="`/img/icons/role_${props.params.value}.png`" alt="Role Icon" class="invert" width="32px" height="32px">
</template>

<script setup>
const props = defineProps()
</script>

<style scoped>
:deep(.invert) {
    filter: invert(1) !important;
}
</style>