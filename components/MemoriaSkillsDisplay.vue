<template>
    <Panel>
        <template #header>
            <h1>
                {{ header }}
            </h1>
        </template>
        <div>
            <ag-grid-vue
            :rowData="[props.skillData]"
            :columnDefs="colDefs"
            :rowHeight="64"
            class="ag-theme-quartz-dark"
            :autoSizeStrategy="autoSizeStrategy"
            domLayout="autoHeight"
            >
            </ag-grid-vue>
        </div>
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
    </Panel>

</template>

<script setup>
import MemoriaIcon from '~/components/MemoriaIcon.vue';
import SingleSkillDisplay from './SingleSkillDisplay.vue';
import RarityIcon from '~/components/RarityIcon.vue';
import TableNameCell from '~/components/TableNameCell.vue';
import TypeIcon from '~/components/TypeIcon.vue';
const props = defineProps(['skillData', 'lang', 'schemeVal'])
const header = computed(() => props.skillData[`${props.lang}_name`])
const autoSizeStrategy = {
        type: 'fitGridWidth',
    };
const colDefs = computed(() => {
        return [
        {
            field: 'unique_id',
            headerName: 'Icon',
            cellRenderer: MemoriaIcon,
            wrapText: true,
            filter: false,
            maxWidth: 64,
            cellClass: 'centered-img'
        },
        {
            field: `${props.lang}_name`,
            headerName: 'Name',
            wrapText: true,
            filter: 'agTextColumnFilter',
            cellRenderer: TableNameCell,
            cellClass: 'centered-cell'
        },
        {
            field: `card_type`,
            headerName: 'Type',
            wrapText: true,
            cellRenderer: TypeIcon,
            maxWidth: 70,
            cellClass: 'centered-cell',
            cellRendererParams: {
                schemeVal: props.schemeVal
            }
        },
        {
            field: `rarity`,
            headerName: 'Rarity',
            wrapText: true,
            cellRenderer: RarityIcon,
            cellClass: 'centered-cell'
        },
        {
            field: `attribute`,
            headerName: 'Attribute',
            wrapText: true,
            cellRenderer: (params) => `<img src="/img/icons/attribute_${params.value}.png" alt="Attribute Icon" class="image" width="32pc" height="32px">`,
            cellClass: 'centered-cell'

        },
        {
            field: `max_phys_atk`,
            headerName: 'R. Atk',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            cellClass: 'centered-cell'
        },
        {
            field: `max_phys_def`,
            headerName: 'R. Def',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            cellClass: 'centered-cell'
        },
        {
            field: `max_mag_atk`,
            headerName: 'Sp. Atk',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            cellClass: 'centered-cell'
        },
        {
            field: `max_mag_def`,
            headerName: 'Sp. Def',
            wrapText: true,
            cellDataType: 'number',
            filter: false,
            cellClass: 'centered-cell'
        },
        {
            field: `awakened`,
            headerName: 'Awakened?',
            wrapText: true,
            filter: false,
            cellClass: 'centered-cell'
        },
        {
            field: `super_awakened`,
            headerName: 'Super Awakened?',
            wrapText: true,
            filter: false,
            cellClass: 'centered-cell'
        },
    ]
})

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