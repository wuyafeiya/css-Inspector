<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import loader from '@monaco-editor/loader';
import type * as Monaco from 'monaco-editor';

const props = defineProps<{
  modelValue: string;
  language?: string;
  theme?: string;
  height?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const editorContainer = ref<HTMLElement | null>(null);
let editor: Monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(async () => {
  if (!editorContainer.value) return;

  try {
    const monaco = await loader.init();

    // 创建编辑器
    editor = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: props.language || 'html',
      theme: props.theme || 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Menlo', 'Courier New', monospace",
      fontLigatures: true,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 2,
      folding: true,
      glyphMargin: false,
      renderLineHighlight: 'all',
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    });

    // 监听内容变化
    editor.onDidChangeModelContent(() => {
      const value = editor?.getValue() || '';
      emit('update:modelValue', value);
    });
  } catch (error) {
    console.error('Monaco Editor 初始化失败:', error);
  }
});

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue);
  }
});

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  if (editor && newTheme) {
    loader.init().then(monaco => {
      monaco.editor.setTheme(newTheme);
    });
  }
});

onBeforeUnmount(() => {
  editor?.dispose();
});
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
