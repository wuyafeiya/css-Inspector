<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1>
          <i class="fas fa-palette"></i>
          CSS Playground
        </h1>
        <p>交互式 CSS 属性编辑器</p>
      </div>
      <ThemeToggle />
    </header>

    <div class="app-layout">
      <Splitpanes>
        <!-- 左侧：属性库 -->
        <Pane :size="20" min-size="15">
          <PropertyLibrary />
        </Pane>

        <!-- 中间：属性详情 -->
        <Pane :size="22" min-size="18">
          <PropertyDetail />
        </Pane>

        <!-- 右侧：预览面板 -->
        <Pane :size="58" min-size="30">
          <PreviewPanel />
        </Pane>
      </Splitpanes>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import PropertyLibrary from './components/PropertyLibrary/PropertyLibrary.vue'
import PropertyDetail from './components/PropertyDetail/PropertyDetail.vue'
import PreviewPanel from './components/Preview/PreviewPanel.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useCSSEditorProvider } from './composables/useCSSEditor'
import { useTheme } from './composables/useTheme'

// 提供全局 CSS 编辑器上下文
useCSSEditorProvider()

// 初始化主题
const { currentTheme } = useTheme()

onMounted(() => {
  console.log('当前主题:', currentTheme.value)
})
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-header {
  background: var(--header-gradient);
  color: var(--header-text);
  padding: 12px 24px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-border-primary);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.app-header h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header h1 i {
  font-size: 16px;
}

.app-header p {
  margin: 0;
  font-size: 12px;
  color: var(--header-text-secondary);
}

.app-layout {
  flex: 1;
  overflow: hidden;
}

.property-library-section,
.property-detail-section,
.preview-panel-section {
  height: 100%;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .app-layout {
    /* Splitpanes 会自动处理 */
  }
}

@media (max-width: 1200px) {
  .app-layout {
    /* Splitpanes 会自动处理 */
  }
}
</style>

