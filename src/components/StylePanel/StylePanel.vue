<template>
  <div class="style-panel">
    <div class="panel-header">
      <h2>当前样式</h2>
      <div class="header-actions">
        <span class="style-count">{{ appliedStyles.length }} 个属性</span>
        <button
          v-if="appliedStyles.length > 0"
          class="reset-btn"
          @click="resetStyles"
          title="重置所有样式"
        >
          <i class="fas fa-redo"></i>
          重置
        </button>
      </div>
    </div>

    <div class="styles-list">
      <StyleItem
        v-for="style in appliedStyles"
        :key="style.property"
        :style="style"
      />

      <div v-if="appliedStyles.length === 0" class="empty-state">
        <i class="fas fa-palette"></i>
        <p>还没有添加样式</p>
        <p class="hint">从左侧属性库中选择属性开始编辑</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCSSEditor } from '../../composables/useCSSEditor';
import StyleItem from './StyleItem.vue';

const { appliedStyles, resetStyles } = useCSSEditor();
</script>

<style scoped>
.style-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border-right: 1px solid var(--color-border-primary);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-primary);
}

.panel-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.style-count {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-danger);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: var(--color-danger-hover);
}

.reset-btn i {
  font-size: 12px;
}

.styles-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: var(--color-text-muted);
  height: 100%;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.empty-state .hint {
  font-size: 12px;
  margin-top: 8px;
  color: var(--color-border-secondary);
}
</style>
