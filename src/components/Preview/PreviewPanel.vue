<template>
  <div class="preview-panel">
    <Splitpanes horizontal>
      <!-- 编辑器区域 -->
      <Pane :size="50" min-size="20">
        <div class="editor-section">
          <!-- 文件标签 -->
          <div class="file-tabs">
            <button
              v-for="file in files"
              :key="file.name"
              :class="['file-tab', { active: currentFile === file.name }]"
              @click="currentFile = file.name"
            >
              <i :class="file.icon"></i>
              {{ file.name }}
            </button>
            <div class="tabs-actions">
              <button @click="copyCode" class="action-btn" title="复制代码">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <!-- 编辑器容器 -->
          <div class="editor-container">
            <MonacoEditor
              v-if="currentFile === 'index.html'"
              v-model="htmlCode"
              language="html"
              :theme="monacoTheme"
              height="100%"
            />
            <MonacoEditor
              v-if="currentFile === 'style.css'"
              v-model="cssCode"
              language="css"
              :theme="monacoTheme"
              height="100%"
            />
          </div>
        </div>
      </Pane>

      <!-- 预览区域 -->
      <Pane :size="50" min-size="20">
        <div class="preview-section">
          <iframe
            :srcdoc="previewContent"
            class="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
            title="预览区域"
          ></iframe>
        </div>
      </Pane>
    </Splitpanes>

    <!-- 复制成功提示 -->
    <transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <i class="fas fa-check-circle"></i>
        <div class="toast-content">
          <div class="toast-title">复制成功</div>
          <div class="toast-message">已复制 {{ currentFile }} 的代码到剪贴板</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { useTheme } from '../../composables/useTheme';
import MonacoEditor from '../Editor/MonacoEditor.vue';

const { currentTheme } = useTheme();

// Monaco Editor 主题
const monacoTheme = computed(() => currentTheme.value === 'dark' ? 'vs-dark' : 'vs');

// 文件列表
const files = [
  { name: 'index.html', icon: 'fab fa-html5' },
  { name: 'style.css', icon: 'fab fa-css3-alt' }
];

// 当前文件
const currentFile = ref('index.html');

// Toast 状态
const showToast = ref(false);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

// HTML 代码
const htmlCode = ref(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Playground</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Hello, CSS Playground!</h1>
    <p>在上方编辑器中编辑代码，这里会实时预览效果。</p>
    <button class="btn">点击按钮</button>
  </div>
</body>
</html>`);

// CSS 代码
const cssCode = ref(`body {
  margin: 0;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #3b82f6;
  margin-top: 0;
}

p {
  color: #666;
  line-height: 1.6;
}

.btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn:hover {
  background: #2563eb;
}`);

// 预览内容：将 CSS 注入到 HTML 中
const previewContent = computed(() => {
  // 将外部 CSS 链接替换为内联样式
  return htmlCode.value.replace(
    /<link[^>]*href=["']style\.css["'][^>]*>/gi,
    `<style>${cssCode.value}</style>`
  );
});

// 复制代码
const copyCode = async () => {
  try {
    const code = currentFile.value === 'index.html' ? htmlCode.value : cssCode.value;
    await navigator.clipboard.writeText(code);

    // 显示 Toast
    showToast.value = true;

    // 清除之前的定时器
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    // 2秒后自动隐藏
    toastTimer = setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<style scoped>
.preview-panel {
  height: 100%;
  background: var(--color-bg-primary);
}

/* 编辑器区域 */
.editor-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 文件标签 */
.file-tabs {
  display: flex;
  align-items: center;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-primary);
  padding: 0 8px;
  gap: 4px;
  flex-shrink: 0;
}

.file-tab {
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.file-tab:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.file-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  background: var(--color-bg-primary);
}

.file-tab i {
  font-size: 14px;
}

.tabs-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.action-btn {
  padding: 6px 10px;
  background: transparent;
  color: var(--color-text-muted);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-primary);
}

.editor-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* 预览区域 */
.preview-section {
  height: 100%;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}

/* Toast 通知 */
.toast-notification {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-success);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10000;
  min-width: 280px;
  max-width: 400px;
}

.toast-notification i {
  font-size: 20px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.toast-message {
  font-size: 12px;
  opacity: 0.95;
}

/* Toast 动画 */
.toast-enter-active {
  animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
  animation: toast-out 0.3s ease-in;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}
</style>
