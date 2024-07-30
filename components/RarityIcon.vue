<template>
    <span v-for="star in starNum" :key="star">
        {{ props.params.value }}
        <img :src="`/img/icons/star_${props.params.value}.png`" :alt="`${props.params.value} Stars Icon`" height="32px" loading="lazy"/>
    </span>
</template>

<script setup>
const props = defineProps()
const starNum = ref(props.params.value)
</script>