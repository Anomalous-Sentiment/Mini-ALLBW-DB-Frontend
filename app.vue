<template>
    <NuxtLayout :name="$device.isDesktop ? 'desktop' : 'mobile'">
      <NuxtPage />
    </NuxtLayout>
  </template>

<script setup>

const siteTitle = 'Mini ALLBW DB'
useSeoMeta({
  title: siteTitle,
  ogTitle: siteTitle,
  description: 'A small database frontend for the game Assault Lily Last Bullet W',
  ogDescription: 'A small database frontend for the game Assault Lily Last Bullet W',
  twitterCard: 'summary_large_image',
})

</script>

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
.p-datatable {
  border: 1px solid var(--p-panel-border-color)
}
</style>