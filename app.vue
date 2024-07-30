<template>
    <NuxtLayout name="desktop">
      <NuxtPage />
    </NuxtLayout>
  </template>

<style>
/* Making ag grid inherit colours from the primevue theme preset */
.ag-theme-quartz-dark {
    --ag-background-color: var(--p-content-background);
    --ag-header-background-color: var(--p-content-background);
    /* var(--p-surface-950) */
    --ag-foreground-color: var(--p-text-color);
    --ag-border-color: var(--p-datatable-header-cell-border-color);
    /* --ag-border-color: var(--p-surface-800);
    --ag-border-color: var(--p-surface-200); */
    --ag-row-height: '50%';
}

.centered-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered-cell {
    display: flex !important;
    align-items: center;
}
</style>