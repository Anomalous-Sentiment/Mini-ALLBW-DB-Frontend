<template>
    <div>
        <img :src="`/img/icons/${props.params.value.type}_icon.png`" alt="Skill Icon" height="16px"/>
        {{ ' ' }}
        <b>{{ props.params.value.name }}</b>
        <Divider/>
        <p>
            {{ props.params.value.desc }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps()

</script>

<style scoped>

</style>