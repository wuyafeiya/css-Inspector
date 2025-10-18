<template>
  <div class="element-selector">
    <h3>预览元素</h3>
    <div class="selector-buttons">
      <button
        v-for="element in elementTypes"
        :key="element.type"
        :class="{ active: previewElement === element.type }"
        @click="setPreviewElement(element.type)"
        :title="element.label"
      >
        <i :class="element.icon"></i>
        <span>{{ element.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCSSEditor } from '../../composables/useCSSEditor';
import type { PreviewElementType } from '../../types';

const { previewElement, setPreviewElement } = useCSSEditor();

const elementTypes: Array<{ type: PreviewElementType; label: string; icon: string }> = [
  { type: 'box', label: 'Box', icon: 'fas fa-square' },
  { type: 'text', label: 'Text', icon: 'fas fa-font' },
  { type: 'button', label: 'Button', icon: 'fas fa-hand-pointer' },
  { type: 'card', label: 'Card', icon: 'fas fa-credit-card' },
];
</script>

<style scoped>
.element-selector {
  padding: 16px;
  border-bottom: 1px solid var(--color-border-primary);
  background: var(--color-bg-primary);
}

.element-selector h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.selector-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.selector-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border-primary);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.selector-buttons button:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-secondary);
  color: var(--color-text-primary);
}

.selector-buttons button.active {
  background: var(--color-primary-lighter);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.selector-buttons button i {
  font-size: 16px;
}
</style>
