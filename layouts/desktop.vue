
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
            <div class="flex-element-side">

            </div>
            <div class="flex-element-main">
                <Menubar :model="items">
                    <template #start>
                    </template>
                    <template #end>
                        Template End
                    </template>
                </Menubar>
                <slot />
            </div>
            <div class="flex-element-side">

            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

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
    max-width: 80%;
    min-width: 80%;
}

.flex-element-side {
    flex: 1;

}

.footer {
    min-height: 160px;
    text-align: center;
}


</style>