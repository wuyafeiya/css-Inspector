<template>
  <div
    class="property-item"
    @click="handleClick"
  >
    <div class="property-header">
      <span class="property-name">{{ property.name }}</span>
      <span class="property-category">{{ categoryLabel }}</span>
    </div>
    <div class="property-description">{{ property.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSPropertyDefinition } from '../../types';
import { useCSSEditor } from '../../composables/useCSSEditor';
import { categories } from '../../data/cssData';

const props = defineProps<{
  property: CSSPropertyDefinition;
}>();

const { selectProperty } = useCSSEditor();

const handleClick = () => {
  selectProperty(props.property);
};

const categoryLabel = computed(() => {
  return categories[props.property.category]?.label || props.property.category;
});
</script>

<style scoped>
.property-item {
  padding: 10px 16px;
  margin: 4px 8px;
  background: var(--card-bg);
  border-radius: 6px;
  border: 1px solid var(--color-border-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.property-item:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateX(2px);
}

.property-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.property-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
}

.property-category {
  font-size: 9px;
  padding: 2px 6px;
  background: var(--color-primary-lighter);
  border-radius: 8px;
  color: var(--color-primary);
  font-weight: 600;
  border: 1px solid var(--color-primary-alpha);
}

.property-description {
  font-size: 11px;
  color: var(--color-text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
