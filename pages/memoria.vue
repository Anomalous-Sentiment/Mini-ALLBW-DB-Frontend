<template>
    <div class="ag-theme-quartz-dark">
        <Message severity="warn">Data may or may not be accurate. Take it with a grain of salt and use at your own risk</Message>
        <Button label="Filter" @click="showFilterDialog = true" />
        <Dialog v-model:visible="showFilterDialog" modal header="Skill Effect Filters" :style="{ width: '50rem' }">
        <div>
            <FilterButtonGrid :filters="typeFilters" header="Types"/>
            <FilterButtonGrid :filters="attributeFilters" header="Attributes"/>
            <FilterButtonGrid :filters="questSkillFilters" header="Huge Skills"/>
            <FilterButtonGrid :filters="gvgSkillFilters" header="Legion Skills"/>
            <FilterButtonGrid :filters="autoSkillFilters" header="Legion Support Skills"/>
            <FilterButtonGrid :filters="awakenedFilters" header="Awakened Status"/>
            <span class="dialogue-footer">
                    <Button type="button" label="Reset" severity="secondary" @click="memoriaStore.resetFilters"></Button>
                    <Button type="button" label="Save" @click="memoriaStore.applyFilters"></Button>
            </span>
        </div>
    </Dialog>
        <ag-grid-vue
        v-if="!toggleTable"
        :rowData="memoria"
        :columnDefs="colDefs"
        :rowHeight="64"
        style="height: 67vh"
        class="ag-theme-quartz-dark"
        pagination="true"
        :autoSizeStrategy="autoSizeStrategy"
        >
        </ag-grid-vue>
 
        <DataTable v-if="toggleTable" v-model:filters="filters" :value="memoria" paginator :rows="100" dataKey="row" filterDisplay="row" sortField="card_mst_id" :sortOrder="1"
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
                <img :src="`/img/memoria/CardIconS0${data['unique_id']}.png`" alt="Icon" height="64px" loading="lazy"/>
            </template>
        </Column>
        <Column :field="`${language}_name`" header="Name" :show-filter-menu="false">
            <template #body="{ data }">
                <NuxtLink :to="`/card/${data['unique_id']}`">
                    {{ data[`${language}_name`] }}
                </NuxtLink>
            </template>
            <template #filter="{ }">
                <InputText v-model="textFilter" type="text" @input="debouncedSearch" placeholder="Search by name" />
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
                <img :src="`/img/icons/auto_icon.png`" alt="GvG Support Icon" height="16px"/>
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
    import { useDebounceFn } from '@vueuse/core'
    import MemoriaIcon from '~/components/MemoriaIcon.vue';
    import RarityIcon from '~/components/RarityIcon.vue';
    import SkillCellDisplay from '~/components/SkillCellDisplay.vue';
    import TableNameCell from '~/components/TableNameCell.vue';
    import TypeIcon from '~/components/TypeIcon.vue';
    const showFilterDialog = ref(false)
    const memoriaStore = useMemoriaStore()
    const { memoria, language, textFilter, schemeVal, questSkillFilters, gvgSkillFilters, autoSkillFilters, typeFilters, attributeFilters, awakenedFilters } = storeToRefs(memoriaStore)
    const nf = new Intl.NumberFormat();
    const { $listen } = useNuxtApp()
    const memoriaDataKey = 'memoria'
    const autoSizeStrategy = {
        type: 'fitGridWidth',
    };
    const colDefs = computed(() => {
        var defaultColumns = [
        {
            field: 'unique_id',
            headerName: 'Icon',
            cellRenderer: MemoriaIcon,
            wrapText: true,
            filter: false,
            maxWidth: 64,
            minWidth: 64,
            cellClass: 'centered-img'
        },
        {
            field: `${language.value}_name`,
            headerName: 'Name',
            wrapText: true,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            cellRenderer: TableNameCell,
            cellClass: 'centered-cell',
            minWidth: 100,
            filterParams: {
                filterPlaceholder: 'Search by name...'
            },
        },
        {
            field: `card_type`,
            headerName: 'Type',
            wrapText: true,
            cellRenderer: TypeIcon,
            maxWidth: 70,
            minWidth: 38,
            filter: false,
            cellClass: 'centered-img',
            cellRendererParams: {
                schemeVal: schemeVal.value
            }
        },
        {
            field: `rarity`,
            headerName: 'Rarity',
            wrapText: true,
            cellRenderer: RarityIcon,
            maxWidth: 70,
            minWidth: 38,
            filter: false,
            cellClass: 'centered-img'
        },
        {
            field: `attribute`,
            headerName: 'Attribute',
            wrapText: true,
            cellRenderer: (params) => `<img src="img/icons/attribute_${params.value}.png" alt="Attribute Icon" class="image" width="32pc" height="32px">`,
            maxWidth: 70,
            minWidth: 38,
            filter: false,
            cellClass: 'centered-img'

        },
    ]
    const extraColumns = [
        {
            field: `max_phys_atk`,
            headerName: 'R. Atk',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            maxWidth: 70,
            minWidth: 70,
            cellClass: 'centered-cell'
        },
        {
            field: `max_phys_def`,
            headerName: 'R. Def',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            maxWidth: 70,
            minWidth: 70,
            cellClass: 'centered-cell'
        },
        {
            field: `max_mag_atk`,
            headerName: 'Sp. Atk',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            maxWidth: 70,
            minWidth: 70,
            cellClass: 'centered-cell'
        },
        {
            field: `max_mag_def`,
            headerName: 'Sp. Def',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            minWidth: 70,
            maxWidth: 70,
            cellClass: 'centered-cell'
        },
        {
            field: `quest_${language}_sk`,
            headerName: 'Huge Skill',
            cellRenderer: SkillCellDisplay,
            wrapText: true,
            filter: false,
            autoHeight: true,
            sortable: false,
            minWidth: 150,
            valueGetter: (p) => {
                const newVal = {}
                newVal[`name`] = p.data[`quest_${language.value}_name`]
                newVal[`desc`] = p.data[`quest_${language.value}_desc`]
                newVal[`type`] = 'quest'
                return newVal
            }
        },
        {
            field: `gvg_${language}_sk`,
            headerName: 'Legion Skill',
            cellRenderer: SkillCellDisplay,
            wrapText: true,
            filter: false,
            autoHeight: true,
            sortable: false,
            minWidth: 150,
            valueGetter: (p) => {
                const newVal = {}
                newVal[`name`] = p.data[`gvg_${language.value}_name`]
                newVal[`desc`] = p.data[`gvg_${language.value}_desc`]
                newVal[`type`] = 'gvg'
                return newVal
            }

        },
        {
            field: `auto_${language}_sk`,
            headerName: 'Legion Support Skill',
            cellRenderer: SkillCellDisplay,
            wrapText: true,
            filter: false,
            autoHeight: true,
            sortable: false,
            minWidth: 150,
            valueGetter: (p) => {
                const newVal = {}
                newVal[`name`] = p.data[`auto_${language.value}_name`]
                newVal[`desc`] = p.data[`auto_${language.value}_desc`]
                newVal[`type`] = 'gvg'
                return newVal
            }

        },
        
    ]
    const { isMobile } = useDevice();
    if (!isMobile)
    {
        defaultColumns = defaultColumns.concat(extraColumns)
    }

    return defaultColumns
})

    const debouncedSearch = useDebounceFn(async() => {
        await memoriaStore.applyFilters()
    }, 500)

    $listen('language:changed', () => {
        refreshMemoria()

    })

    const toggleTable = ref(false)
    $listen('table:toggled', () => {
        // Change to the alternate table
        toggleTable.value = !toggleTable.value
        // Reset text filter
        textFilter.value = ''
        debouncedSearch()

    })

    var filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'attribute': { value: null, matchMode: FilterMatchMode.EQUALS },
        'card_type': { value: null, matchMode: FilterMatchMode.EQUALS },
    })

    const { status: statusString, refresh: refreshMemoria} = await useAsyncData(memoriaDataKey, getMemoria)

    const loading = computed(() => {
        if (statusString.value == 'success')
        {
            return false
        }
        return true
    })

    async function getMemoria()
    {

        if (memoria.value.length == 0 || !(`${language.value}_name` in memoria.value[0]))
        {
            await memoriaStore.fetch()
        }
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

:deep(.p-message) {
    margin: 0rem;
}

.filter-on {
    background-color: yellow;
}

:deep(.p-togglebutton-content) {
    gap: 0;
}

.dialogue-footer {
    margin-left: auto; 
    margin-right: 0;
    float: right;
}

:deep(input[class^=ag-]) {
    background: var(--p-inputtext-background);
    border: 1px solid var(--p-inputtext-border-color);
}
</style>