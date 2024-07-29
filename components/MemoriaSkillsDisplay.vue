<template>
    <h1>
        {{ header }}
    </h1>
    <p>
        {{ awakened }}
        <br/>
        {{ superAwakened }}
    </p>
    <div class="flex-container">
        <div class="flex-element-side">
            <SingleSkillDisplay :skillData="props.skillData" title="Huge Skill" type="quest" :lang="props.lang"/>
        </div>
        <div class="flex-element-main">
            <SingleSkillDisplay :skillData="props.skillData" title="Legion Skill" type="gvg" :lang="props.lang"/>
        </div>
        <div class="flex-element-side">
            <SingleSkillDisplay :skillData="props.skillData" title="Legion Support Skill" type="auto" :lang="props.lang"/>
        </div>
    </div>
</template>

<script setup>
import SingleSkillDisplay from './SingleSkillDisplay.vue';
const props = defineProps(['skillData', 'lang'])
const header = computed(() => props.skillData[`${props.lang}_name`])
const awakened = computed(() => `Awakened: ${props.skillData['awakened']}`)
const superAwakened = computed(() => `Super Awakened: ${props.skillData['super_awakened']}`)

</script>

<style scoped>
    .flex-container {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .flex-element-main {
        max-width: 33%;
        min-width: 33%;
    }

    .flex-element-side {
        flex: 1;
        margin: 0 10px 0 10px;

}
</style>