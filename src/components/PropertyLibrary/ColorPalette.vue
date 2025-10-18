<template>
  <div class="color-palette">
    <div
      v-for="family in tailwindColors"
      :key="family.name"
      class="color-family"
    >
      <div class="family-name">{{ family.name }}</div>
      <div class="color-grid">
        <div
          v-for="color in family.colors"
          :key="color.shade"
          class="color-item"
          :style="{ backgroundColor: color.hex }"
          :title="`${family.name}-${color.shade}: ${color.hex}`"
          @click="copyColor(color.hex, `${family.name}-${color.shade}`)"
        >
          <span class="shade-label">{{ color.shade }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tailwindColors } from '../../data/tailwindColors';

const copyColor = (hex: string, name: string) => {
  // 复制颜色值到剪贴板
  navigator.clipboard.writeText(hex).then(() => {
    console.log(`已复制: ${name} (${hex})`);
  });
};
</script>

<style scoped>
.color-palette {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.color-family {
  background: var(--color-bg-primary);
  border-radius: 8px;
  padding: 12px;
  border: 1px solid var(--color-border-primary);
}

.family-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  padding-left: 4px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 4px;
}

.color-item {
  aspect-ratio: 1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-item:hover {
  transform: scale(1.15);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shade-label {
  font-size: 9px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.color-item:hover .shade-label {
  opacity: 1;
}

/* 浅色需要深色文字 */
.color-item[style*="#f"]:not([style*="#f0"]):not([style*="#f1"]):not([style*="#f2"]):not([style*="#f3"]):not([style*="#f4"]):not([style*="#f5"]):not([style*="#f6"]):not([style*="#f7"]) .shade-label,
.color-item[style*="#e"] .shade-label {
  color: #333;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
</style>
