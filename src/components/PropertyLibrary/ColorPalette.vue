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

    <!-- 复制成功提示 -->
    <transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <i class="fas fa-check-circle"></i>
        <div class="toast-content">
          <div class="toast-title">复制成功</div>
          <div class="toast-message">{{ copiedColorName }}: {{ copiedColorHex }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { tailwindColors } from '../../data/tailwindColors';

const showToast = ref(false);
const copiedColorName = ref('');
const copiedColorHex = ref('');
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const copyColor = (hex: string, name: string) => {
  // 复制颜色值到剪贴板
  navigator.clipboard.writeText(hex).then(() => {
    // 更新提示信息
    copiedColorName.value = name;
    copiedColorHex.value = hex;

    // 显示提示
    showToast.value = true;

    // 清除之前的定时器
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    // 2秒后自动隐藏
    toastTimer = setTimeout(() => {
      showToast.value = false;
    }, 2000);
  });
};
</script>

<style scoped>
.color-palette {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
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
  font-family: 'Courier New', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
