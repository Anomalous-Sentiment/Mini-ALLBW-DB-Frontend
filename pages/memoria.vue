<template>
    <div>
        
        <Button label="Toggle Color Scheme" @click="toggleColorScheme()" />

        <Message severity="warn">This is a work-in-progress</Message>
      <DataTable v-model:filters="filters" :value="memoria" paginator :rows="100" dataKey="card_mst_id" filterDisplay="row" sortField="card_mst_id" :sortOrder="1"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable
        scroll-height="67vh"
        :loading="loading.value"
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
        <Column field="name" header="Name" :show-filter-menu="false">
            <template #body="{ data }">
                <NuxtLink :to="`/card/${data['unique_id']}`">
                    {{ data['name'] }}
                </NuxtLink>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name"/>
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
        <Column field="quest_sk" header="Huge Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/quest_icon.png`" alt="Quest Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data['quest_sk'] }}</b>
                <Divider/>
                {{ data['quest_desc'] }}
            </template>
        </Column>
        <Column field="gvg_sk" header="Legion Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/gvg_icon.png`" alt="GvG Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data['gvg_sk'] }}</b>
                <Divider/>
                {{ data['gvg_desc'] }}
            </template>
        </Column>
        <Column field="auto_sk" header="Legion Support Skill" sortable style="min-width: 8rem">
            <template #body="{ data }">
                <img :src="`/img/icons/gvg_support_icon.png`" alt="GvG Support Icon" height="16px"/>
                {{ ' ' }}
                <b>{{ data['auto_sk'] }}</b>
                <Divider/>
                {{ data['support_desc'] }}
            </template>
        </Column>
      </DataTable>
    </div>
  </template>

<script setup>

    import { FilterMatchMode } from '@primevue/core/api';
    const memoriaStore = useMemoriaStore()
    const { memoria } = storeToRefs(memoriaStore)

    console.log(memoria.value)
    const nf = new Intl.NumberFormat();
    const filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.EQUALS },
        'attribute': { value: null, matchMode: FilterMatchMode.EQUALS },
        'card_type': { value: null, matchMode: FilterMatchMode.EQUALS },
    }

    const { status: statusString } = await useAsyncData('memoria', () => getMemoria())

    const loading = computed(() => {
        if (statusString.value == 'succes')
        {
            return false
        }
        return true
    })

    async function getMemoria()
    {
        await memoriaStore.fetch()
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