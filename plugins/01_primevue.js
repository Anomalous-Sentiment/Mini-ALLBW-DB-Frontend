import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import InlineMessage from 'primevue/inlinemessage';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import Image from 'primevue/image';
import Tooltip from 'primevue/tooltip';
import Divider from 'primevue/divider';
import Card from 'primevue/card';

import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '{slate.50}',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
    },
}});

export default defineNuxtPlugin((nuxtApp) => {    

    //console.log(useRuntimeConfig().public.siteKey)
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: '.app-dark-mode',
            }
        }
    });

    nuxtApp.vueApp.component("DataTable", DataTable);
    nuxtApp.vueApp.component("Column", Column);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("MultiSelect", MultiSelect);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Panel", Panel);
    nuxtApp.vueApp.component("InlineMessage", InlineMessage);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    nuxtApp.vueApp.component("Message", Message);
    nuxtApp.vueApp.component("Image", Image);
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.component("Divider", Divider);
    nuxtApp.vueApp.component("Card", Card);
    
    //other components that you need
});
