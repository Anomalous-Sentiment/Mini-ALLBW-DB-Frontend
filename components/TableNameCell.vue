<template>
<div>
    <NuxtLink :to="`/card/${props.params.data['unique_id']}`">
        {{ props.params.value }}
        {{ ' ' }}
    </NuxtLink>
    <span style="color: red;">
            {{ props.params.data['super_awakened'] ? '(Super Awakened)' :  props.params.data['awakened'] ? '(Awakened)' :  ''}}
    </span>
</div>

</template>

<script setup>
const props = defineProps()

</script>

<style scoped>

</style>