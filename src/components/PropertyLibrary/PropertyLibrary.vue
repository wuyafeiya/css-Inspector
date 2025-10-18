<template>
  <div class="property-library">
    <div class="library-header">
      <h2>CSS 属性库</h2>
    </div>

    <PropertySearch />
    <div class="category-filter-wrapper">
      <CategoryFilter />
    </div>
  </div>
</template>

<script setup lang="ts">
import PropertySearch from './PropertySearch.vue';
import CategoryFilter from './CategoryFilter.vue';
</script>

<style scoped>
.property-library {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border-right: 1px solid var(--color-border-primary);
  transition: all 0.3s ease;
}

.library-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 16px;
  background: var(--header-gradient);
  border-bottom: none;
  flex-shrink: 0;
}

.library-header h2 {
  font-size: 15px;
  font-weight: 600;
  color: var(--header-text);
  margin: 0;
}

.category-filter-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
