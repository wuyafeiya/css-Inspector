<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="currentTheme === 'light' ? '切换到暗色模式' : '切换到亮色模式'"
  >
    <transition name="fade" mode="out-in">
      <i v-if="currentTheme === 'light'" key="sun" class="fas fa-sun"></i>
      <i v-else key="moon" class="fas fa-moon"></i>
    </transition>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { currentTheme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid var(--color-border-secondary);
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.theme-toggle:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover i {
  transform: rotate(15deg);
}

/* 图标切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.8);
}
</style>
