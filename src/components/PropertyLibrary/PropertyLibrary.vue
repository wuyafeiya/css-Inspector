<template>
  <div class="property-library">
    <div class="library-header">
      <h2>CSS 属性库</h2>
      <span class="property-count">{{ totalCount }}</span>
    </div>

    <PropertySearch />
    <CategoryFilter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { metadata } from '../../data/cssData';
import PropertySearch from './PropertySearch.vue';
import CategoryFilter from './CategoryFilter.vue';

const totalCount = computed(() => {
  return `${metadata.totalProperties} 属性 + ${metadata.totalSelectors} 选择器 + ${metadata.totalAtRules} 规则 + ${metadata.totalUnits} 单位 + ${metadata.totalTypes} 类型`;
});
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
  justify-content: space-between;
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

.property-count {
  font-size: 10px;
  color: var(--header-text);
  background: var(--color-bg-tertiary);
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
}
</style>
