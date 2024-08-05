
<template>
    <div class="outer-container">
        <div 
        style="padding: 5px;
        text-align: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color:aliceblue;
        font-size: 1rem;
        ">
            <h1>Mini ALLBW DB</h1>
        </div>
        <div class="flex-container">
            <div class="flex-element-main">
                <Menubar :model="items">
                    <template #start>
                    </template>
                    <template #item="{ item, props, hasSubmenu }">
                        <NuxtLink v-slot="{ href, navigate }" :to="item.to" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span>{{ item.label }}</span>
                            </a>
                        </NuxtLink>
                    </template>
                    <template #end>
                        <Select v-model="language" :options="languageOptions" optionLabel="name" placeholder="Select a language" @change="() => memoriaStore.setLang(language.key)" />
                    </template>
                </Menubar>
                <slot />
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const memoriaStore = useMemoriaStore()
const language = ref('en')
const items = ref([
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Memoria',
        to: '/memoria'
    }
]);

const languageOptions = [
    {
        'key': 'en',
        'name': 'English'
    },
    {
        'key': 'jp',
        'name': 'Japanese'
    },
    {
        'key': 'cn',
        'name': 'Chinese'
    },
    {
        'key': 'kr',
        'name': 'Korean'
    },
    {
        'key': 'tw',
        'name': 'Taiwanese'
    }
]


</script>

<style scoped>

h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0;
    /* margin-block-end is same as margin-block-start (0.67em) by default. Only set to 0 here to make the warning message closer to the header*/ 
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.outer-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    min-height: 98vmin;
}
.flex-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
}

.flex-element-main {
    max-width: 100%;
    min-width: 100%;
}

.flex-element-side {
    flex: 1;

}

.footer {
    min-height: 160px;
    text-align: center;
}


</style>