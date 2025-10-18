<template>
  <div class="property-editor">
    <!-- 颜色选择器 -->
    <input
      v-if="propertyDef.type === 'color'"
      type="color"
      :value="modelValue"
      @input="handleColorChange"
      class="color-input"
    />

    <!-- 下拉选择器 -->
    <select
      v-else-if="propertyDef.type === 'select'"
      :value="modelValue"
      @change="handleSelectChange"
      class="select-input"
    >
      <option
        v-for="option in propertyDef.possibleValues"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>

    <!-- 数字输入 (length) -->
    <div v-else-if="propertyDef.type === 'length'" class="number-input-group">
      <input
        type="range"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 100"
        :value="numericValue"
        @input="handleRangeChange"
        class="range-input"
      />
      <input
        type="number"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 100"
        :value="numericValue"
        @input="handleNumberChange"
        class="number-input"
      />
      <span class="unit">{{ propertyDef.unit || 'px' }}</span>
    </div>

    <!-- 数字输入 (number) -->
    <div v-else-if="propertyDef.type === 'number'" class="number-input-group">
      <input
        type="range"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 10"
        :step="0.1"
        :value="modelValue"
        @input="handleDirectChange"
        class="range-input"
      />
      <input
        type="number"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 10"
        :step="0.1"
        :value="modelValue"
        @input="handleDirectChange"
        class="number-input"
      />
    </div>

    <!-- 角度输入 -->
    <div v-else-if="propertyDef.type === 'angle'" class="number-input-group">
      <input
        type="range"
        :min="propertyDef.min ?? -180"
        :max="propertyDef.max ?? 180"
        :value="numericValue"
        @input="handleRangeChange"
        class="range-input"
      />
      <input
        type="number"
        :min="propertyDef.min ?? -180"
        :max="propertyDef.max ?? 180"
        :value="numericValue"
        @input="handleNumberChange"
        class="number-input"
      />
      <span class="unit">{{ propertyDef.unit || 'deg' }}</span>
    </div>

    <!-- 时间输入 -->
    <div v-else-if="propertyDef.type === 'time'" class="number-input-group">
      <input
        type="range"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 5"
        :step="0.1"
        :value="numericValue"
        @input="handleRangeChange"
        class="range-input"
      />
      <input
        type="number"
        :min="propertyDef.min ?? 0"
        :max="propertyDef.max ?? 5"
        :step="0.1"
        :value="numericValue"
        @input="handleNumberChange"
        class="number-input"
      />
      <span class="unit">{{ propertyDef.unit || 's' }}</span>
    </div>

    <!-- 文本输入 -->
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="handleDirectChange"
      class="text-input"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSPropertyDefinition } from '../../types';

const props = defineProps<{
  modelValue: string;
  propertyDef: CSSPropertyDefinition;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// 提取数字值 (去除单位)
const numericValue = computed(() => {
  const match = props.modelValue.match(/^(-?\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
});

const handleColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleSelectChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

const handleRangeChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const unit = props.propertyDef.unit || '';
  emit('update:modelValue', target.value + unit);
};

const handleNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const unit = props.propertyDef.unit || '';
  emit('update:modelValue', target.value + unit);
};

const handleDirectChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.property-editor {
  width: 100%;
}

.color-input {
  width: 100%;
  height: 36px;
  border: 1px solid var(--color-border-secondary);
  border-radius: 6px;
  cursor: pointer;
}

.select-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--color-border-secondary);
  border-radius: 6px;
  font-size: 13px;
  background: var(--input-bg);
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;
}

.select-input:focus {
  border-color: var(--color-primary);
}

.number-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-input {
  flex: 1;
  height: 4px;
}

.number-input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid var(--color-border-secondary);
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
  outline: none;
  background: var(--input-bg);
  color: var(--color-text-primary);
}

.number-input:focus {
  border-color: var(--color-primary);
}

.unit {
  font-size: 12px;
  color: var(--color-text-secondary);
  width: 30px;
}

.text-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--color-border-secondary);
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  background: var(--input-bg);
  color: var(--color-text-primary);
}

.text-input:focus {
  border-color: var(--color-primary);
}
</style>
