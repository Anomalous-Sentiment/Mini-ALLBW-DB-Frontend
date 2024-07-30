import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component

export default defineNuxtPlugin((nuxtApp) => {    
    nuxtApp.vueApp.component("AgGridVue", AgGridVue);

});
