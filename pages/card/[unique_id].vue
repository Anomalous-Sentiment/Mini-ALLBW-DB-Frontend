<template>
    <div>
        {{ uniqueId }}
    </div>
</template>
<script setup>
const route = useRoute()
const uniqueId = route.params.unique_id
</script>