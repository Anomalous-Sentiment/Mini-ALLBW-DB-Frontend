<template>
    <div>
        
        <Button label="Toggle Color Scheme" @click="nuxtApp.$toggleColorScheme()" />

        <Message severity="warn">This is a work-in-progress</Message>
      <DataTable v-model:filters="filters" :value="memoria" paginator :rows="100" dataKey="row" filterDisplay="row" sortField="card_mst_id" :sortOrder="1"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable
        scroll-height="67vh"
        :loading="loading"
      >

        <template #empty> No memoria found. </template>
        <template #loading> Loading memoria data. Please wait. </template>
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="card_mst_id" header="Icon">
            <template #body="{ data }">
                <img :src="`/img/memoria/CardIconS0${data['unique_id']}.png`" alt="Icon" height="64px"/>
            </template>
        </Column>
        <Column :field="`${language}_name`" header="Name" :show-filter-menu="false">
            <template #body="{ data }">
                <NuxtLink :to="`/card/${data['unique_id']}`">
                    {{ data[`${language}_name`] }}
                </NuxtLink>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="textFilter" type="text" @input="debounceFilter(filterCallback, 500)" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="card_type" header="Type" :show-filter-menu="false">
            <template #body="{ data }">
                {{ data['card_type'] }}
            </template>
        </Column>
        <Column field="rarity" header="Rarity" :showFilterMenu="false" >
            <template #body="{ data }">
                {{ data["rarity"] }}
            </template>
        </Column>
        <Column field="attribute" header="Attribute" filterField="attribute" :showFilterMenu="false" >
            <template #body="{ data }">
                {{ data["attribute"] }}
            </template>
        </Column>
        <Column field="max_phys_atk" header="Atk" sortable>
            <template #body="{ data }">
                {{ nf.format(data['max_phys_atk']) }}
            </template>
        </Column>
        <Column field="max_phys_def" header="Def" sortable>
            <template #body="{ data }">
                {{ nf.format(data['max_phys_def']) }}
            </template>
        </Column>
        <Column field="max_mag_atk" header="Sp. Atk" sortable>
            <template #body="{ data }">
                {{ nf.format(data['max_mag_atk']) }}
            </template>
        </Column>
        <Column field="max_mag_def" header="Sp. Def" sortable>
            <template #body="{ data }">
                {{ nf.format(data['max_mag_def']) }}
            </template>
        </Column>
        <Column :field="`quest_${language}_name`" header="Huge Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/quest_icon.png`" alt="Quest Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data[`quest_${language}_name`] }}</b>
                <Divider/>
                {{ data[`quest_${language}_desc`] }}
            </template>
        </Column>
        <Column :field="`gvg_${language}_sk`" header="Legion Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/gvg_icon.png`" alt="GvG Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data[`gvg_${language}_name`] }}</b>
                <Divider/>
                {{ data[`gvg_${language}_desc`] }}
            </template>
        </Column>
        <Column :field="`auto_${language}_sk`" header="Legion Support Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/gvg_support_icon.png`" alt="GvG Support Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data[`auto_${language}_name`] }}</b>
                <Divider/>
                {{ data[`auto_${language}_desc`] }}
            </template>
        </Column>
      </DataTable>
    </div>
  </template>

<script setup>

    import { FilterMatchMode } from '@primevue/core/api';
    const memoriaStore = useMemoriaStore()
    const { memoria, language, textFilter } = storeToRefs(memoriaStore)
    const nuxtApp = useNuxtApp()
    const nf = new Intl.NumberFormat();
    const nameFilterTimeoutId = ref();

    function debounceFilter()
    {
        // Function to filter names of memoria
        function innerFunc()
        {
            console.log('called')
            memoriaStore.applyFilters()
        }
        const debounced = debounce(innerFunc, 1000)
        debounced()
    }

    function debounce(func, timeout) {
        return (...args) => {
          clearTimeout(nameFilterTimeoutId.value);
          nameFilterTimeoutId.value = setTimeout(() => {
            func(...args);
          }, timeout);
        }
    }
    var filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'attribute': { value: null, matchMode: FilterMatchMode.EQUALS },
        'card_type': { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const { status: statusString } = await useAsyncData('memoria', () => getMemoria())

    const loading = computed(() => {
        if (statusString.value == 'success')
        {
            return false
        }
        return true
    })

    async function getMemoria()
    {
        await memoriaStore.fetch()
        return memoria.value
    }

</script>

<style scoped>
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.2rem;
}
:deep(.p-datatable .p-datatable-thead > tr > th){
  padding: 1px;
}

:deep(.p-paginator) {
  padding: 0;
}

:deep(.p-multiselect .p-multiselect-trigger) {
    width: 10px;
}

:deep(.p-message) {
    margin: 0rem;
}
/*
:deep(.p-message .p-message-wrapper) {
    padding: 0.5rem 1rem;
}
*/
</style>