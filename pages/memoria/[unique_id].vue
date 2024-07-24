<template>
    <div>
        {{ uniqueId }}
    </div>
</template>
<script setup>
const uniqueId = route.params.unique_id
</script>