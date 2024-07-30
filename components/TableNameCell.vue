<template>

        <NuxtLink :to="`/card/${props.params.data['unique_id']}`">
        {{ props.params.value }}
    </NuxtLink>


</template>

<script setup>
const props = defineProps()

</script>

<style scoped>

</style>