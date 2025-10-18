<template>
  <div class="preview-container">
    <!-- Box 预览 -->
    <div
      v-if="previewElement === 'box'"
      class="preview-element preview-box"
      :style="computedStyles"
    >
      <i class="fas fa-square"></i>
    </div>

    <!-- Text 预览 -->
    <div
      v-else-if="previewElement === 'text'"
      class="preview-element preview-text"
      :style="computedStyles"
    >
      The quick brown fox jumps over the lazy dog
    </div>

    <!-- Button 预览 -->
    <button
      v-else-if="previewElement === 'button'"
      class="preview-element preview-button"
      :style="computedStyles"
    >
      <i class="fas fa-check"></i>
      Click Me
    </button>

    <!-- Card 预览 -->
    <div
      v-else-if="previewElement === 'card'"
      class="preview-element preview-card"
      :style="computedStyles"
    >
      <div class="card-header">
        <i class="fas fa-credit-card"></i>
        <h3>Card Title</h3>
      </div>
      <div class="card-body">
        <p>This is a sample card component for CSS styling.</p>
      </div>
      <div class="card-footer">
        <button>Action</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCSSEditor } from '../../composables/useCSSEditor';

const { previewElement, getComputedStyles } = useCSSEditor();

const computedStyles = computed(() => getComputedStyles());
</script>

<style scoped>
.preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: var(--color-bg-secondary);
}

.preview-element {
  transition: all 0.3s ease;
}

/* Box 默认样式 */
.preview-box {
  width: 200px;
  height: 200px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 64px;
}

/* Text 默认样式 */
.preview-text {
  font-size: 24px;
  color: var(--color-text-primary);
  max-width: 600px;
  line-height: 1.5;
}

/* Button 默认样式 */
.preview-button {
  padding: 12px 24px;
  font-size: 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.preview-button:hover {
  background: var(--color-primary-dark);
}

/* Card 默认样式 */
.preview-card {
  width: 320px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-primary);
}

.card-header i {
  font-size: 24px;
  color: var(--color-primary);
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-body {
  padding: 20px;
}

.card-body p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.card-footer {
  padding: 16px 20px;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  display: flex;
  justify-content: flex-end;
}

.card-footer button {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.card-footer button:hover {
  background: var(--color-primary-dark);
}
</style>
