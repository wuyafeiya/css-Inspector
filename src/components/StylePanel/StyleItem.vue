<template>
  <div class="style-item">
    <div class="style-header">
      <span class="style-name">{{ style.property }}</span>
      <button @click="handleRemove" class="remove-btn" title="删除">×</button>
    </div>
    <PropertyEditor
      :model-value="style.value"
      :property-def="style.propertyDef"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import type { AppliedStyle } from '../../types';
import { useCSSEditor } from '../../composables/useCSSEditor';
import PropertyEditor from './PropertyEditor.vue';

const props = defineProps<{
  style: AppliedStyle;
}>();

const { updateStyle, removeStyle } = useCSSEditor();

const handleUpdate = (value: string) => {
  updateStyle(props.style.property, value);
};

const handleRemove = () => {
  removeStyle(props.style.property);
};
</script>

<style scoped>
.style-item {
  padding: 12px;
  border-bottom: 1px solid var(--color-border-tertiary);
  background: var(--color-bg-primary);
}

.style-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.style-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', monospace;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-danger-light);
  color: var(--color-danger);
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: var(--color-danger-lighter);
}
</style>
