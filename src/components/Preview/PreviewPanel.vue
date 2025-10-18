<template>
  <div class="preview-panel">
    <div class="panel-header">
      <h2>实时预览</h2>
    </div>

    <ElementSelector />

    <div class="preview-area">
      <PreviewElement />
    </div>

    <div class="css-output">
      <div class="output-header">
        <h3>生成的 CSS</h3>
        <button @click="copyCSSCode" class="copy-btn" title="复制 CSS 代码">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <pre class="css-code">{{ cssCode }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCSSEditor } from '../../composables/useCSSEditor';
import ElementSelector from './ElementSelector.vue';
import PreviewElement from './PreviewElement.vue';

const { appliedStyles, getComputedStyles } = useCSSEditor();

const cssCode = computed(() => {
  if (appliedStyles.value.length === 0) {
    return '/* 暂无样式 */';
  }

  const styles = appliedStyles.value
    .map(({ property, value }) => {
      return `  ${property}: ${value};`;
    })
    .join('\n');

  return `.element {\n${styles}\n}`;
});

const copyCSSCode = async () => {
  try {
    await navigator.clipboard.writeText(cssCode.value);
    alert('CSS 代码已复制到剪贴板！');
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<style scoped>
.preview-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid var(--color-border-primary);
}

.panel-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.preview-area {
  flex: 1;
  min-height: 400px;
  overflow: hidden;
}

.css-output {
  border-top: 1px solid var(--color-border-primary);
  background: var(--code-bg);
  max-height: 300px;
  overflow-y: auto;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--code-header-bg);
  border-bottom: 1px solid var(--code-border);
}

.output-header h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  padding: 6px 12px;
  background: var(--code-button-bg);
  color: var(--color-text-muted);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--code-button-hover);
  color: var(--color-text-light);
}

.css-code {
  margin: 0;
  padding: 16px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--code-text);
  overflow-x: auto;
}
</style>
